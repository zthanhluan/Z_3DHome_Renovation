import React from 'react';

function LanguageSettings({ language, setLanguage }) {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="language-settings">
      <label htmlFor="language">Language:</label>
      <select id="language" value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}

export default LanguageSettings;
