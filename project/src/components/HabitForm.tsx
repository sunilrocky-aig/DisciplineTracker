import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Habit } from '../types';

interface HabitFormProps {
  habit?: Habit;
  isOpen: boolean;
  onClose: () => void;
  onSave: (habitData: Omit<Habit, 'id' | 'createdAt' | 'isActive'>) => void;
}

const HABIT_ICONS = ['📚', '💪', '🧘', '🏃', '💧', '🥗', '😴', '✍️', '🎵', '🧑‍💻'];
const HABIT_COLORS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
];
const CATEGORIES = ['Health', 'Productivity', 'Learning', 'Wellness', 'Fitness', 'Creativity', 'Social', 'Personal'];

export const HabitForm: React.FC<HabitFormProps> = ({ habit, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    time: '',
    category: 'Health',
    frequency: 'daily' as const,
    scheduledDays: [] as number[],
    customFrequency: 3,
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '📚',
  });

  useEffect(() => {
    if (habit) {
      setFormData({
        name: habit.name,
        description: habit.description || '',
        time: habit.time || '',
        category: habit.category,
        frequency: habit.frequency,
        scheduledDays: habit.scheduledDays || [],
        customFrequency: habit.customFrequency || 3,
        color: habit.color,
        icon: habit.icon,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        time: '',
        category: 'Health',
        frequency: 'daily',
        scheduledDays: [],
        customFrequency: 3,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: '📚',
      });
    }
  }, [habit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave(formData);
    onClose();
  };

  const toggleDay = (day: number) => {
    setFormData(prev => ({
      ...prev,
      scheduledDays: prev.scheduledDays.includes(day)
        ? prev.scheduledDays.filter(d => d !== day)
        : [...prev.scheduledDays, day].sort(),
    }));
  };

  if (!isOpen) return null;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {habit ? 'Edit Habit' : 'New Habit'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="Enter habit name..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="Optional description..."
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time (Optional)
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Set a specific time for this habit (optional)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-5 gap-2">
              {HABIT_ICONS.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-3 text-xl rounded-lg border-2 transition-all duration-200 ${
                    formData.icon === icon
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                      : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {HABIT_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-12 h-12 rounded-lg border-4 transition-all duration-200 relative overflow-hidden ${
                    formData.color === color
                      ? 'border-gray-400 dark:border-gray-500 scale-110'
                      : 'border-gray-200 dark:border-gray-600 hover:scale-105'
                  }`}
                >
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{ background: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Frequency
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="daily"
                  checked={formData.frequency === 'daily'}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                  className="mr-2 text-emerald-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Daily</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="weekly"
                  checked={formData.frequency === 'weekly'}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                  className="mr-2 text-emerald-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Specific Days</span>
              </label>
            </div>

            {formData.frequency === 'weekly' && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Select days:</p>
                <div className="grid grid-cols-7 gap-1">
                  {dayNames.map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(index)}
                      className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                        formData.scheduledDays.includes(index)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>{habit ? 'Update' : 'Create'} Habit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};