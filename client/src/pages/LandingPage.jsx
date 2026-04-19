import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Brain, Target, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 inline-block">
          AI-Powered Goal Mastery
        </span>
        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
          Achieve Your 5-Year Goals <br />
          <span className="text-primary">One Day At A Time.</span>
        </h1>
        <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
          GoalPilot AI uses behavioral science and the power of Gemini 1.5 Pro to break your biggest dreams into actionable daily habits.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/auth" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
            Start Your Journey <ArrowRight size={20} />
          </Link>
          <button className="glass-card px-8 py-4 border border-glass-border hover:bg-glass-border transition-all">
            How it works
          </button>
        </div>
      </motion.div>

      <motion.div 
        className="mt-20 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
        <img 
          src="/hero.png" 
          alt="AI Dashboard Preview" 
          className="relative glass-card p-2 w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-primary/30"
        />
      </motion.div>

      <section className="grid md:grid-cols-3 gap-8 mt-40 max-w-6xl w-full">
        <FeatureCard 
          icon={<Brain className="text-primary" size={40} />}
          title="AI Reasoning"
          desc="Optimized by LLMs to create realistic, science-backed schedules."
        />
        <FeatureCard 
          icon={<Target className="text-accent" size={40} />}
          title="OKR Framework"
          desc="Break down massive objectives into measurable key results."
        />
        <FeatureCard 
          icon={<Shield className="text-blue-400" size={40} />}
          title="Adaptive Planning"
          desc="Missed a task? The AI recalculates your path without burnout."
        />
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card hover:border-primary/50 transition-all p-8 text-left">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-text-muted leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
