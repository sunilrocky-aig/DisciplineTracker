import React from 'react';
import { Calendar, TrendingUp, Award } from 'lucide-react';
import { HabitCard } from './HabitCard';
import { Habit } from '../types';

interface TodayViewProps {
  habits: Habit[];
  getHabitCompletion: (habitId: string, date: string) => boolean;
  getHabitStreak: (habitId: string) => number;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
  today: string;
}

export const TodayView: React.FC<TodayViewProps> = ({
  habits,
  getHabitCompletion,
  getHabitStreak,
  toggleHabitCompletion,
  onEditHabit,
  onDeleteHabit,
  today,
}) => {
  const todaysHabits = habits.filter(habit => {
    if (!habit.isActive) return false;
    
    if (habit.frequency === 'daily') return true;
    
    if (habit.frequency === 'weekly') {
      const todayDay = new Date().getDay();
      return habit.scheduledDays?.includes(todayDay);
    }
    
    return false;
  });

  const completedToday = todaysHabits.filter(habit => 
    getHabitCompletion(habit.id, today)
  ).length;

  const completionRate = todaysHabits.length > 0 ? 
    Math.round((completedToday / todaysHabits.length) * 100) : 0;

  const totalStreak = todaysHabits.reduce((sum, habit) => 
    sum + getHabitStreak(habit.id), 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Today's Habits
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-3 rounded-lg shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  {completionRate}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completion Rate
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-3 rounded-lg shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {completedToday}/{todaysHabits.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Habits Completed
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-3 rounded-lg shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {totalStreak}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Streak Days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Daily Progress
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              {completedToday} of {todaysHabits.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Habits Grid */}
      {todaysHabits.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No habits for today
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create some habits to get started on your journey!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todaysHabits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={getHabitCompletion(habit.id, today)}
              streak={getHabitStreak(habit.id)}
              onToggle={() => toggleHabitCompletion(habit.id, today)}
              onEdit={() => onEditHabit(habit)}
              onDelete={() => onDeleteHabit(habit.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};