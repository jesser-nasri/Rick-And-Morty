import React, { useEffect, useState } from "react";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode((prev) => !prev)}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-yellow-400"
        >
          <path d="M12 3.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 0112 3.25zM3.25 12a.75.75 0 01-.75-.75v-.5a.75.75 0 011.5 0v.5a.75.75 0 01-.75.75zM12 20.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM3.967 5.03a.75.75 0 01.06-1.06l.354-.354a.75.75 0 011.06 1.06l-.354.354a.75.75 0 01-1.06-.06zM18.03 18.033a.75.75 0 01.06 1.06l-.354.354a.75.75 0 11-1.06-1.06l.354-.354a.75.75 0 011.06-.06zM20.75 12a.75.75 0 01-.75-.75v-.5a.75.75 0 011.5 0v.5a.75.75 0 01-.75.75zM5.03 18.033a.75.75 0 01-.06 1.06l-.354.354a.75.75 0 01-1.06-1.06l.354-.354a.75.75 0 011.06-.06zM12 7a5 5 0 100 10 5 5 0 000-10z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M17.293 17.293A7.973 7.973 0 0019 12a8 8 0 10-8 8 7.973 7.973 0 005.293-1.707 6.5 6.5 0 01-7.586-7.586 7.973 7.973 0 005.586 7.586z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;
