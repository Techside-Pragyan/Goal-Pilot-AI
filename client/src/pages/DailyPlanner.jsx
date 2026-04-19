import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { CheckCircle2, Circle, MessageSquare, Send, Zap } from 'lucide-react';

const DailyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Good morning! Ready to crush your goals today? You have 4 key tasks to move the needle on your Software Engineer journey.' }
  ]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await taskAPI.getDailyTasks();
      setTasks(data);
    } catch (err) {
      // For demo, if API fails, use mock data
      setTasks([
        { _id: '1', title: 'Complete React Hooks deep dive', category: 'LEARNING', status: 'PENDING' },
        { _id: '2', title: 'Push 3 commits to GoalPilot repo', category: 'WORK', status: 'COMPLETED' },
        { _id: '3', title: '30 min HIIT workout', category: 'HEALTH', status: 'PENDING' },
        { _id: '4', title: 'Read 10 pages of Clean Architecture', category: 'LEARNING', status: 'PENDING' },
      ]);
    }
  };

  const toggleTask = async (id, currentStatus) => {
    const newStatus = currentStatus === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      await taskAPI.updateTask(id, newStatus);
      setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChat = (e) => {
    e.preventDefault();
    if (!chat.trim()) return;
    setMessages([...messages, { role: 'user', text: chat }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: "That's a great question! Based on your progress, I'd suggest focusing on your React deep dive first while your energy is high. Consistency is key!" }]);
    }, 1000);
    setChat('');
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 min-h-[80vh]">
      {/* Task List */}
      <div className="lg:col-span-2 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold mb-2">Daily Planner</h1>
            <p className="text-text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-2 text-sm text-text-muted">
            <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-400" /> Day 14 Streak</span>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div 
              key={task._id}
              onClick={() => toggleTask(task._id, task.status)}
              className={`glass-card flex items-center gap-4 p-6 cursor-pointer transition-all hover:translate-x-1 ${task.status === 'COMPLETED' ? 'opacity-50 grayscale' : 'border-l-4 border-l-primary'}`}
            >
              {task.status === 'COMPLETED' ? (
                <CheckCircle2 className="text-accent" size={28} />
              ) : (
                <Circle className="text-slate-600" size={28} />
              )}
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${task.status === 'COMPLETED' ? 'line-through text-slate-500' : ''}`}>
                  {task.title}
                </h3>
                <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{task.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Coach Chat */}
      <div className="glass-card flex flex-col h-[700px]">
        <div className="flex items-center gap-3 border-b border-glass-border pb-6 mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">AI</div>
          <div>
            <h3 className="font-bold">Coach Gemini</h3>
            <span className="text-xs text-accent flex items-center gap-1">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span> Online
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-slate-800 text-text-main rounded-bl-none'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleChat} className="mt-6 relative">
          <input 
            className="input-field pr-12"
            placeholder="Ask your coach anything..."
            value={chat}
            onChange={e => setChat(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyPlanner;
