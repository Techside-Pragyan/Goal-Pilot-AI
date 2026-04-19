const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  subGoalId: { type: mongoose.Schema.Types.ObjectId }, // Reference to the weekly target it belongs to
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'MISSED'], default: 'PENDING' },
  category: { type: String, enum: ['WORK', 'LEARNING', 'HEALTH', 'REST'], default: 'WORK' },
  estimatedTime: { type: Number }, // In minutes
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
