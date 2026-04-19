const express = require('express');
const Goal = require('../models/Goal');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const { breakdownGoal } = require('../services/aiService');

const router = express.Router();

// Get all goals for user
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new 5-year goal and trigger AI breakdown
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;
    
    // 1. Create the main goal
    const newGoal = new Goal({
      userId: req.user.userId,
      title,
      description,
      targetDate: targetDate || new Date(new Date().setFullYear(new Date().getFullYear() + 5))
    });

    // 2. Get AI Roadmap
    const roadmap = await breakdownGoal(title, description);
    
    // 3. Populate subgoals from AI roadmap
    // (Simplification: just storing year 1 for now)
    roadmap.yearlyRoadmap.forEach(year => {
      newGoal.subGoals.push({
        title: year.title,
        timeframe: 'YEARLY',
        aiReasoning: roadmap.aiReasoning
      });
    });

    await newGoal.save();

    // 4. Create first week's tasks automatically
    const firstWeekTasks = roadmap.firstMonthBreakdown[0].tasks;
    const taskPromises = firstWeekTasks.map(t => {
      return new Task({
        userId: req.user.userId,
        goalId: newGoal._id,
        title: t,
        date: new Date(), // Set to today/this week
        category: 'WORK'
      }).save();
    });

    await Promise.all(taskPromises);

    res.status(201).json({ goal: newGoal, roadmap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
