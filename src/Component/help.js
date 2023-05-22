// HelpPage.js

import React from 'react';
import './help.css';
import { NavLink } from 'react-router-dom';


const HelpPage = () => {
  return (
    <div className="help-page">
      <h1 className="help-title">Welcome to our Help Center</h1>
      <p className="help-description">
        Need assistance with our 3D room design website? You've come to the right place! Below you'll find answers to common questions and helpful tips to get you started.
      </p>
      <div className="help-section">
        <h2 className="help-section-title">Getting Started</h2>
        <p className="help-section-description">
          If you're new to our website, here are some steps to help you get started on creating your dream room:
        </p>
          <li>
            <span className="help-icon"></span>
            Sign up for an account or log in if you already have one.
          </li>
          <li>
            <span className="help-icon"></span>
            Select a room template.
          </li>
          <li>
            <span className="help-icon"></span>
            Use our intuitive parameter interface to add furniture, decor, and other elements to your room.
          </li>
          <li>
            <span className="help-icon"></span>
            Customize colors, textures, model to your liking.
          </li>
          <li>
            <span className="help-icon"></span>
            You can create and download the model.
          </li>
        
      </div> 
      <NavLink to ="/contactpage"> Contact us</NavLink>

    </div>
  );
};

export default HelpPage;
