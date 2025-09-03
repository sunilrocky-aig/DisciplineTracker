import React from 'react';
import { CheckCircle2, Circle, Trash2, Edit3, Flame, Clock } from 'lucide-react';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  isCompleted: boolean;
  streak: number;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  isCompleted,
  streak,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const formatTime = (time?: string) => {
    if (!time) return null;
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{ background: habit.color }}
        />
      </div>
      <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
            style={{ background: habit.color }}
          >
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {habit.name}
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {habit.category}
              </p>
              {habit.time && (
                <div className="flex items-center space-x-1 text-xs text-purple-600 dark:text-purple-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(habit.time)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {habit.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {habit.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={onToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            isCompleted
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
          <span className="font-medium">
            {isCompleted ? 'Completed' : 'Mark Done'}
          </span>
        </button>

        {streak > 0 && (
          <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-semibold">{streak} day streak</span>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};