import React from 'react';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'Formal', label: 'Formal 👔' },
  { id: 'Non formal', label: 'Non formal 😊' },
  { id: 'Gen Z', label: 'Gen Z ✨' },
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  return (
    <div>
       <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-2 text-center">Pilih Tema Caption</label>
      <div className="flex justify-center items-center space-x-2 md:space-x-4 bg-white/80 dark:bg-slate-700/80 border border-stone-300 dark:border-stone-600 rounded-full p-1.5 shadow-inner">
        {themes.map((theme) => (
          <div key={theme.id} className="flex-1">
            <input
              type="radio"
              id={theme.id}
              name="theme"
              value={theme.id}
              checked={selectedTheme === theme.id}
              onChange={() => onThemeChange(theme.id)}
              className="sr-only"
            />
            <label
              htmlFor={theme.id}
              className={`w-full block text-center px-4 py-2 rounded-full cursor-pointer transition-all duration-300 text-sm md:text-base ${
                selectedTheme === theme.id
                  ? 'bg-teal-600 text-white shadow'
                  : 'bg-transparent text-stone-600 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-slate-600/50'
              }`}
            >
              {theme.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};