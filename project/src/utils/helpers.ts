export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getWeekDates = (date: Date): Date[] => {
  const week = [];
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    week.push(day);
  }

  return week;
};

export const getWeekDateRange = (date: Date): { start: Date; end: Date } => {
  const weekDates = getWeekDates(date);
  return {
    start: weekDates[0],
    end: weekDates[6],
  };
};

export const calculateWeeklyStats = (
  habits: any[],
  completions: any[],
  weekStart: Date
): any => {
  const weekDates = getWeekDates(weekStart);
  const weekEnd = weekDates[6];
  
  const weekCompletions = completions.filter(completion => {
    const completionDate = new Date(completion.date);
    return completionDate >= weekStart && completionDate <= weekEnd;
  });

  const activeHabits = habits.filter(habit => habit.isActive);
  const totalPossibleCompletions = activeHabits.length * 7;
  const actualCompletions = weekCompletions.filter(c => c.completed).length;
  
  const completionRate = totalPossibleCompletions > 0 ? 
    (actualCompletions / totalPossibleCompletions) * 100 : 0;

  // Calculate perfect days
  const perfectDays = weekDates.reduce((count, date) => {
    const dateString = formatDate(date);
    const dayCompletions = activeHabits.every(habit => {
      return weekCompletions.some(completion => 
        completion.habitId === habit.id && 
        completion.date === dateString && 
        completion.completed
      );
    });
    return dayCompletions ? count + 1 : count;
  }, 0);

  // Calculate habit-specific stats
  const habitStats = activeHabits.map(habit => {
    const habitCompletions = weekCompletions.filter(
      c => c.habitId === habit.id && c.completed
    ).length;
    
    return {
      habitId: habit.id,
      habitName: habit.name,
      completions: habitCompletions,
      target: 7, // Assuming daily habits for now
      completionRate: (habitCompletions / 7) * 100,
      streak: 0, // Will be calculated by the hook
    };
  });

  return {
    weekStart: formatDate(weekStart),
    weekEnd: formatDate(weekEnd),
    totalHabits: activeHabits.length,
    completedHabits: actualCompletions,
    completionRate: Math.round(completionRate),
    perfectDays,
    longestStreak: 0, // Will be calculated separately
    habitStats,
  };
};