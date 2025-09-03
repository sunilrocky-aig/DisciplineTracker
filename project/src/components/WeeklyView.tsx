import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, ChevronLeft, ChevronRight, BarChart3, Flame } from 'lucide-react';
import { Habit, HabitCompletion, WeeklyStats } from '../types';
import { getWeekDates, getWeekDateRange, calculateWeeklyStats, formatDate } from '../utils/helpers';

interface WeeklyViewProps {
  habits: Habit[];
  completions: HabitCompletion[];
  getHabitStreak: (habitId: string) => number;
}

export const WeeklyView: React.FC<WeeklyViewProps> = ({
  habits,
  completions,
  getHabitStreak,
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekDates = getWeekDates(currentWeek);
  const { start: weekStart, end: weekEnd } = getWeekDateRange(currentWeek);
  const stats = calculateWeeklyStats(habits, completions, weekStart);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const getHabitCompletionForDate = (habitId: string, date: Date): boolean => {
    const dateString = formatDate(date);
    const completion = completions.find(
      c => c.habitId === habitId && c.date === dateString
    );
    return completion?.completed || false;
  };

  const activeHabits = habits.filter(habit => habit.isActive);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Weekly Review
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze your progress and stay on track
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium text-gray-900 dark:text-white px-4">
              {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
              {weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 p-3 rounded-lg shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  {stats.completionRate}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Weekly Rate
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
                  {stats.perfectDays}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Perfect Days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-lg shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stats.totalHabits}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Habits
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-3 rounded-lg shadow-lg">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {stats.completedHabits}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Done
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Weekly Progress Grid
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400"></div>
            {weekDates.map((date, index) => (
              <div key={index} className="text-center">
                <div className={`text-sm font-medium ${isToday(date) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isToday(date) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>

          {activeHabits.map(habit => (
            <div key={habit.id} className="grid grid-cols-8 gap-2 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                  style={{ background: habit.color }}
                >
                  {habit.icon}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {habit.name}
                </span>
              </div>
              
              {weekDates.map((date, index) => {
                const isCompleted = getHabitCompletionForDate(habit.id, date);
                return (
                  <div key={index} className="flex justify-center">
                    <div
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 border-emerald-400 shadow-lg'
                          : 'border-gray-300 dark:border-gray-600'
                      } ${isToday(date) ? 'ring-2 ring-purple-300 dark:ring-purple-700' : ''}`}
                    >
                      {isCompleted && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Habit Statistics */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Individual Habit Performance
          </h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {stats.habitStats.map(stat => {
              const habit = habits.find(h => h.id === stat.habitId);
              const streak = getHabitStreak(stat.habitId);
              
              return (
                <div key={stat.habitId} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                      style={{ background: habit?.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                      {habit?.icon || '📚'}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {stat.habitName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.completions} of {stat.target} completed ({Math.round(stat.completionRate)}%)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-medium bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                        {streak}
                      </span>
                    </div>
                    <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 shadow-sm"
                        style={{ width: `${stat.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};