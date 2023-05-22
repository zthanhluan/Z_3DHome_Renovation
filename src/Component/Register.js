import React, { useState } from 'react';
import SignupForm from './SignupForm';
import Login1 from './Login1';
import './AuthPage.css'; // Import the CSS file

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="auth-page">
      <div className="tab-buttons">
        <button className={activeTab === 'login' ? 'active' : ''} onClick={() => handleTabClick('login')}>
          Login
        </button>
        <button className={activeTab === 'signup' ? 'active' : ''} onClick={() => handleTabClick('signup')}>
          Sign Up
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'login' ? <Login1 /> : null}
        {activeTab === 'signup' ? <SignupForm /> : null}
        
      </div>
    </div>
  );
}

export default AuthPage;