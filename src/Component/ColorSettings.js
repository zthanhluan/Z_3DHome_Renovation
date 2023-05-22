import React from 'react';
import './colorssettings.css';

function ColorSettings({ colorScheme, setColorScheme }) {
  const handleColorChange = (color) => {
    setColorScheme(color);
  };

  return (
    <div className="color-settings">
      <label htmlFor="color-scheme">Color Scheme:</label>
      <div className="color-scheme">
        <div
          className={`color-option-light ${colorScheme === 'light' ? ' active' : ''}`}
          onClick={() => handleColorChange('light')}
        ></div>
        <div
          className={`color-option-dark ${colorScheme === 'dark' ? ' active' : ''}`}
          onClick={() => handleColorChange('dark')}
        ></div>
      </div>
    </div>
  );
}

export default ColorSettings;
