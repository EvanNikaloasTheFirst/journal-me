"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Save theme to localStorage when toggled
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        relative w-14 h-8 rounded-full
        bg-gray-300 dark:bg-gray-700
        transition-colors duration-300
        focus:outline-none
      "
    >
      <span
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full
          bg-white dark:bg-black
          shadow-md
          flex items-center justify-center
          transition-transform duration-300
          ${darkMode ? "translate-x-6" : ""}
        `}
      >
        {darkMode ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
