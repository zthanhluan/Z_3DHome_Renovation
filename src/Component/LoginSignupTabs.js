import React, { useState } from 'react';
import Register from './Register';
import SignupForm from './SignupForm';
import './LoginSignupTabs.css';

const LoginSignupTabs = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="login-signup-tabs">
      <div className="tab-buttons">
        <button className={activeTab === 'register' ? 'active' : ''} onClick={() => handleTabClick('register')}>Login</button>
        <button className={activeTab === 'signupform' ? 'active' : ''} onClick={() => handleTabClick('signupform')}>SignupForm</button>
      </div>
      <div className="tab-content">
        {activeTab === 'register' ? <Register /> : <SignupForm />}
      </div>
    </div>
  );
};

export default LoginSignupTabs;