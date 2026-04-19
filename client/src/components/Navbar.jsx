import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Target, Calendar, LayoutDashboard, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-card flex justify-between items-center m-4 py-4 px-8 sticky top-4 z-50">
      <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-primary">
        <Target size={32} />
        <span>GoalPilot AI</span>
      </Link>
      
      <div className="flex items-center gap-8">
        {user ? (
          <>
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary transition-colors">
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link to="/planner" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Calendar size={20} />
              Planner
            </Link>
            <div className="flex items-center gap-4 ml-4 border-l border-glass-border pl-6">
              <span className="flex items-center gap-2 text-text-muted">
                <User size={18} />
                {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </>
        ) : (
          <Link to="/auth" className="btn-primary">Get Started</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
