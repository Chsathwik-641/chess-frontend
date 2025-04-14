import React from "react";

const ThemePanel = ({ setTheme }) => {
  return (
    <div className="theme-panel">
      <h3>Choose Board Theme</h3>
      <select onChange={(e) => setTheme(e.target.value)}>
        <option value="classic">Classic</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
    </div>
  );
};

export default ThemePanel;
