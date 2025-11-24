import React from 'react';

interface HeaderProps {
    currentTheme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTheme, toggleTheme }) => {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 dark:text-teal-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536l12.232-12.232z" />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-teal-700 dark:text-teal-300">
                ModCapt - GJN ver.1.0
            </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-stone-200/50 dark:bg-slate-700/50 hover:bg-stone-300/50 dark:hover:bg-slate-600/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Toggle dark mode"
        >
          {currentTheme === 'light' ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};