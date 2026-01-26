import React from 'react';

export default function Navbar({ theme, setTheme, language, setLanguage }) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-primary-700 dark:text-primary-300">
          CHROMOSPHERE POWER
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          
          <a href="#plants" className="hidden md:inline text-gray-700 dark:text-gray-200">
            Plants
          </a>

          <a href="#contact" className="hidden md:inline text-gray-700 dark:text-gray-200">
            Contact
          </a>

          {/* Marathi toggle button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
            className="px-3 py-1 rounded text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
          >
            {language === 'mr' ? 'English' : 'मराठी'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            className="p-2 rounded bg-gray-100 dark:bg-gray-700"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>

        </div>
      </div>
    </nav>
  );
}
