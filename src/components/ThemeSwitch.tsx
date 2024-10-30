import React, { useEffect, useState } from 'react';
import siteMetadata from '../data/siteMetadata'


const Sun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

const Moon = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`group:hover:text-gray-100 h-6 w-6 ${darkMode ? 'text-white' : ''}`}
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const Monitor = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
    <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
    <line x1="7" y1="17" x2="13" y2="17"></line>
    <line x1="10" y1="13" x2="10" y2="17"></line>
  </svg>
);

const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(siteMetadata.theme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setMenuOpen(false);
    console.log("Theme changed", newTheme);

    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  };

  return (
    <div className="relative mr-5 flex items-center">
      <button
        aria-label="Theme switcher"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center hover:text-primary-500 dark:hover:text-primary-400"
      >
        {mounted && theme === 'dark' ? <Moon darkMode={true} /> : theme === 'light' ? <Sun /> : <Monitor />}
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
          <button onClick={() => handleThemeChange('light')} className="w-full p-2 flex items-center">
            <Sun />
            <span className="ml-2">Light</span>
          </button>
          <button onClick={() => handleThemeChange('dark')} className="w-full p-2 flex items-center">
            <Moon darkMode={false} />
            <span className="ml-2">Dark</span>
          </button>
          <button onClick={() => handleThemeChange('system')} className="w-full p-2 flex items-center">
            <Monitor />
            <span className="ml-2">System</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;
