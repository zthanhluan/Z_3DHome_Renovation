import React, { useState } from 'react';
import LanguageSettings from './LanguageSettings';
import UsernameSettings from './UsernameSettings';
import PasswordSettings from './PasswordSettings';
import './settings.css';
import { FaCog, FaLanguage, FaUser, FaLock } from 'react-icons/fa';

function SettingsPage() {
  const [language, setLanguage] = useState('en');
  const [username, setUsername] = useState('example');
  const [password, setPassword] = useState('');

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1><FaCog /> Settings</h1>
      </div>
      <div className="settings-section-language">
        <div className="settings-icon-lang"><FaLanguage /></div>
        <LanguageSettings language={language} setLanguage={setLanguage} />
      </div>
      <div className="settings-section-name">
        <div className="settings-icon-name"><FaUser /></div>
        <UsernameSettings username={username} setUsername={setUsername} />
      </div>
      <div className="settings-section-pass">
        <div className="settings-icon-pass"><FaLock /></div>
        <PasswordSettings password={password} setPassword={setPassword} />
      </div>
    </div>
  );
}

export default SettingsPage;