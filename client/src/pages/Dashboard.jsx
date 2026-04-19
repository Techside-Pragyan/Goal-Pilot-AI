import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { goalAPI } from '../services/api';
import { Plus, Target, CheckSquare, TrendingUp, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const { data } = await goalAPI.getGoals();
      setGoals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { day: 'Mon', completed: 4 },
    { day: 'Tue', completed: 3 },
    { day: 'Wed', completed: 5 },
    { day: 'Thu', completed: 2 },
    { day: 'Fri', completed: 6 },
    { day: 'Sat', completed: 4 },
    { day: 'Sun', completed: 7 },
  ];

  if (loading) return <div>Loading your achievements...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Your Command Center</h1>
          <p className="text-text-muted">Stay focused on your 5-year vision.</p>
        </div>
        <Link to="/set-goal" className="btn-primary flex items-center gap-2">
          <Plus size={20} /> New Goal
        </Link>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Progress Stats */}
        <div className="md:col-span-2 glass-card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="text-primary" /> Productivity Score
            </h3>
            <span className="text-accent font-bold">↑ 12% this week</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Items */}
        <div className="glass-card flex flex-col justify-center items-center text-center">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
                <CheckSquare size={48} className="text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-2">3 Tasks Left</h3>
            <p className="text-text-muted mb-8">You're making great progress towards your Software Engineer goal!</p>
            <Link to="/planner" className="btn-primary w-full">Open Daily Planner</Link>
        </div>
      </div>

      {/* Goal Roadmaps */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Current Roadmaps</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {goals.map(goal => (
            <div key={goal._id} className="glass-card hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-1">{goal.title}</h3>
                  <p className="text-text-muted text-sm">{goal.description}</p>
                </div>
                <div className="bg-accent/20 text-accent px-3 py-1 rounded text-xs font-bold">
                    ACTIVE
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>65%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-text-muted pt-4">
                  <span>{goal.subGoals.length} Yearly Milestones</span>
                  <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
          {goals.length === 0 && (
            <div className="col-span-2 glass-card border-dashed text-center py-20">
                <Target size={64} className="mx-auto text-slate-700 mb-6" />
                <h3 className="text-xl text-slate-400">No active goals found. Start by dreaming big!</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
