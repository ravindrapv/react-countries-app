import React, { useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    updateBodyStyles(!darkMode);
  };

  const updateBodyStyles = (isDarkMode) => {
    document.body.style.backgroundColor = isDarkMode ? "#333" : "#fff";
    document.body.style.color = isDarkMode ? "yellow" : "#000";
  };

  return (
    <div>
      <button
        className=" bg-slate-400 py-2 px-8 rounded-3xl mt-4"
        onClick={toggleDarkMode}
      >
        {darkMode ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default DarkModeToggle;
