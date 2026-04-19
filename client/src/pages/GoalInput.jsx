import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { goalAPI } from '../services/api';
import { Sparkles, ArrowRight, Loader } from 'lucide-react';

const GoalInput = () => {
  const [goal, setGoal] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await goalAPI.createGoal(goal);
      setAiResult(data.roadmap);
      // Wait a bit so user can see AI generation effect
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (err) {
      alert('Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="glass-card">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/20 p-3 rounded-lg">
            <Sparkles className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold">What is your 5-year vision?</h1>
        </div>

        {!aiResult ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-semibold uppercase tracking-wider text-text-muted">Goal Title</label>
              <input 
                className="input-field text-xl"
                placeholder="e.g. Become a Senior Software Engineer"
                value={goal.title}
                onChange={e => setGoal({...goal, title: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-sm font-semibold uppercase tracking-wider text-text-muted">Why do you want to achieve this?</label>
              <textarea 
                className="input-field min-h-[150px] py-4"
                placeholder="Describe your motivation, current status, and any specific constraints..."
                value={goal.description}
                onChange={e => setGoal({...goal, description: e.target.value})}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-6 text-xl flex justify-center items-center gap-3"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                  AI Architecting Your Future...
                </>
              ) : (
                <>
                  Generate 5-Year Roadmap <ArrowRight />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="bg-accent/10 border border-accent/20 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-accent mb-4">Roadmap Generated Successfully!</h2>
              <p className="text-text-muted leading-relaxed italic">
                "{aiResult.aiReasoning}"
              </p>
            </div>
            <div className="space-y-4 text-left">
              <h3 className="font-bold">Immediate Targets:</h3>
              {aiResult.firstMonthBreakdown[0].tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {task}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted animate-pulse">Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalInput;
