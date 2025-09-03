import React, { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import { HabitCard } from './HabitCard';
import { HabitForm } from './HabitForm';
import { Habit } from '../types';

interface HabitsViewProps {
  habits: Habit[];
  getHabitCompletion: (habitId: string, date: string) => boolean;
  getHabitStreak: (habitId: string) => number;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  onAddHabit: (habitData: Omit<Habit, 'id' | 'createdAt' | 'isActive'>) => void;
  onUpdateHabit: (id: string, updates: Partial<Habit>) => void;
  onDeleteHabit: (id: string) => void;
  today: string;
}

export const HabitsView: React.FC<HabitsViewProps> = ({
  habits,
  getHabitCompletion,
  getHabitStreak,
  toggleHabitCompletion,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  today,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsFormOpen(true);
  };

  const handleSaveHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'isActive'>) => {
    if (editingHabit) {
      onUpdateHabit(editingHabit.id, habitData);
    } else {
      onAddHabit(habitData);
    }
    setEditingHabit(undefined);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingHabit(undefined);
  };

  const activeHabits = habits.filter(habit => habit.isActive);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Habits
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and track your daily routines
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add Habit</span>
        </button>
      </div>

      {activeHabits.length === 0 ? (
        <div className="text-center py-16">
          <Target className="w-20 h-20 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Start Building Better Habits
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Create your first habit to begin your journey towards a more productive and fulfilling lifestyle.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Habit</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeHabits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isCompleted={getHabitCompletion(habit.id, today)}
              streak={getHabitStreak(habit.id)}
              onToggle={() => toggleHabitCompletion(habit.id, today)}
              onEdit={() => handleEditHabit(habit)}
              onDelete={() => onDeleteHabit(habit.id)}
            />
          ))}
        </div>
      )}

      <HabitForm
        habit={editingHabit}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveHabit}
      />
    </div>
  );
};