import { useState, useEffect } from 'react';
import { Habit, HabitCompletion } from '../types';
import { generateId, formatDate } from '../utils/helpers';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedCompletions = localStorage.getItem('completions');

    if (savedHabits) {
      const parsedHabits = JSON.parse(savedHabits).map((habit: any) => ({
        ...habit,
        createdAt: new Date(habit.createdAt),
      }));
      setHabits(parsedHabits);
    }

    if (savedCompletions) {
      const parsedCompletions = JSON.parse(savedCompletions).map((completion: any) => ({
        ...completion,
        completedAt: completion.completedAt ? new Date(completion.completedAt) : undefined,
      }));
      setCompletions(parsedCompletions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('completions', JSON.stringify(completions));
  }, [completions]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'isActive'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: generateId(),
      createdAt: new Date(),
      isActive: true,
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
    setCompletions(prev => prev.filter(completion => completion.habitId !== id));
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    const existingCompletion = completions.find(
      c => c.habitId === habitId && c.date === date
    );

    if (existingCompletion) {
      setCompletions(prev => prev.map(completion =>
        completion.id === existingCompletion.id
          ? { ...completion, completed: !completion.completed, completedAt: !completion.completed ? new Date() : undefined }
          : completion
      ));
    } else {
      const newCompletion: HabitCompletion = {
        id: generateId(),
        habitId,
        date,
        completed: true,
        completedAt: new Date(),
      };
      setCompletions(prev => [...prev, newCompletion]);
    }
  };

  const getHabitCompletion = (habitId: string, date: string): boolean => {
    const completion = completions.find(
      c => c.habitId === habitId && c.date === date
    );
    return completion?.completed || false;
  };

  const getHabitStreak = (habitId: string): number => {
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    while (streak < 365) { // Max 365 days to prevent infinite loops
      const dateString = formatDate(currentDate);
      const isCompleted = getHabitCompletion(habitId, dateString);
      
      if (!isCompleted) break;
      
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  return {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabitCompletion,
    getHabitStreak,
  };
};