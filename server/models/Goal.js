const mongoose = require('mongoose');

const subGoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  timeframe: { type: String, enum: ['YEARLY', 'MONTHLY', 'WEEKLY'], required: true },
  status: { type: String, enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], default: 'NOT_STARTED' },
  targetDate: { type: Date },
  aiReasoning: { type: String } // Why this milestone was chosen
});

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // The 5-year goal
  description: { type: String },
  startDate: { type: Date, default: Date.now },
  targetDate: { type: Date }, // 5 years from now
  status: { type: String, enum: ['ACTIVE', 'COMPLETED', 'ARCHIVED'], default: 'ACTIVE' },
  subGoals: [subGoalSchema],
  isAI_Generated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', goalSchema);
