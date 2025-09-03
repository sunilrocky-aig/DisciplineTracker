import React from 'react';
import { Moon, Sun, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { theme, toggleTheme } = useTheme();

  const views = [
    { id: 'today', label: 'Today' },
    { id: 'habits', label: 'Habits' },
    { id: 'weekly', label: 'Weekly Review' },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-2 rounded-lg shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              HabitFlow
            </h1>
          </div>

          <nav className="flex items-center space-x-1">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => onViewChange(view.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentView === view.id
                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-white shadow-lg transform scale-105'
                    : 'text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                {view.label}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};