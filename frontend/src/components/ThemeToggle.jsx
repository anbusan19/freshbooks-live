import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-primary-light dark:hover:bg-dark-secondary transition-colors"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <HiSun className="w-5 h-5 text-primary-light" />
            ) : (
                <HiMoon className="w-5 h-5 text-primary-dark" />
            )}
        </button>
    );
};

export default ThemeToggle;
