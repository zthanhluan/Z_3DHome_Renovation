import React, { useState } from 'react';

function PasswordSettings({ setPassword }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handlePasswordChange = () => {
    // Check if the current password matches the saved password
    if (currentPassword === 'savedPassword') {
      // Check if the new password and confirm new password match
      if (newPassword === confirmNewPassword) {
        setPassword(newPassword);
        alert('Password changed successfully!');
      } else {
        alert("New password and confirm new password don't match.");
      }
    } else {
      alert('Current password is incorrect.');
    }
  };

  return (
    <div className="password-settings">
      <label htmlFor="current-password">Current Password:</label>
      <input type="password" id="current-password" value={currentPassword} onChange={handleCurrentPasswordChange} />

      <label htmlFor="new-password">New Password:</label>
      <input type="password" id="new-password" value={newPassword} onChange={handleNewPasswordChange} />

      <label htmlFor="confirm-new-password">Confirm New Password:</label>
      <input type="password" id="confirm-new-password" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />

      <button onClick={handlePasswordChange} style={{marginTop: "1rem", marginBottom:"1rem"}}>Change Password</button>
    </div>
  );
}

export default PasswordSettings;