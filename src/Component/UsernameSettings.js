import React from 'react';

function UsernameSettings({ username, setUsername }) {
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="username-settings">
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={handleUsernameChange} />
    </div>
  );
}

export default UsernameSettings;
