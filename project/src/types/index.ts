export interface Habit {
  id: string;
  name: string;
  description?: string;
  time?: string; // Optional time in HH:MM format
  category: string;
  frequency: 'daily' | 'weekly' | 'custom';
  scheduledDays?: number[]; // 0-6 for Sunday-Saturday
  customFrequency?: number; // times per week for custom frequency
  color: string;
  icon: string;
  createdAt: Date;
  isActive: boolean;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface WeeklyStats {
  weekStart: string;
  weekEnd: string;
  totalHabits: number;
  completedHabits: number;
  completionRate: number;
  perfectDays: number;
  longestStreak: number;
  habitStats: Array<{
    habitId: string;
    habitName: string;
    completions: number;
    target: number;
    completionRate: number;
    streak: number;
  }>;
}

export type ThemeMode = 'light' | 'dark';