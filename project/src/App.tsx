import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { TodayView } from './components/TodayView';
import { HabitsView } from './components/HabitsView';
import { WeeklyView } from './components/WeeklyView';
import { useHabits } from './hooks/useHabits';
import { formatDate } from './utils/helpers';

function AppContent() {
  const [currentView, setCurrentView] = useState('today');
  const {
    habits,
    completions,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabitCompletion,
    getHabitStreak,
  } = useHabits();

  const today = formatDate(new Date());

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleEditHabit = (habit: any) => {
    // This will be handled by individual views
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'today':
        return (
          <TodayView
            habits={habits}
            getHabitCompletion={getHabitCompletion}
            getHabitStreak={getHabitStreak}
            toggleHabitCompletion={toggleHabitCompletion}
            onEditHabit={handleEditHabit}
            onDeleteHabit={deleteHabit}
            today={today}
          />
        );
      case 'habits':
        return (
          <HabitsView
            habits={habits}
            getHabitCompletion={getHabitCompletion}
            getHabitStreak={getHabitStreak}
            toggleHabitCompletion={toggleHabitCompletion}
            onAddHabit={addHabit}
            onUpdateHabit={updateHabit}
            onDeleteHabit={deleteHabit}
            today={today}
          />
        );
      case 'weekly':
        return (
          <WeeklyView
            habits={habits}
            completions={completions}
            getHabitStreak={getHabitStreak}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 transition-all duration-300">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;