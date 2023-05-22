import { NavLink } from 'react-router-dom';
import './options_design.css';
import React, { useState } from 'react';
import './dashboard.css'; // CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCog, faHome, faQuestionCircle, faPalette } from '@fortawesome/free-solid-svg-icons';

import roomDesignImage from '../Images/room-slider4.png'; 
import Room1 from '../Images/Room1.jpg';
import Room2 from '../Images/Room2.jpg';

function OptionsDesign() {
  const [isOpen, setIsOpen] = useState(true); // State for toggle button

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
  
      <div className="options-container">
         <div className={`dashboard ${isOpen ? 'open' : 'closed'}`}>
      <div className="image-container">
        <img src={roomDesignImage} alt="Room Design" />
      </div>
      <div className="toggle-button1" onClick={handleToggle}>
        {/* You can use an arrow icon or any other suitable icon here */}
        {isOpen ? (
          <FontAwesomeIcon icon={faAngleLeft} />
        ) : (
          <FontAwesomeIcon icon={faAngleRight} />
        )}
      </div>
      <div className="itemslist">
        
        {/* Add your items here */}
        <ul>
        <NavLink to="/settings">  <li>
            <FontAwesomeIcon icon={faCog} />
           <span>Settings</span>
          </li></NavLink>
          <NavLink to="/settings">  <li>
            <FontAwesomeIcon icon={faHome} />
            <NavLink to="/Home">  <span>Home</span></NavLink>
          </li></NavLink>
          <NavLink to="/settings">   <li>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <NavLink to="/help"> <span>Help</span> </NavLink>
          </li></NavLink>
          <NavLink to="/settings"> <li>
            <FontAwesomeIcon icon={faPalette} />
            <NavLink to="/CustomDesign"> <span>Custom Design</span> </NavLink>
          </li> </NavLink>
          {/* ... */}
        </ul>
      </div>
    </div>
        <div className="option">
          <img className="option-image" src={Room1} alt="Option 1" />
          <p className="option-info">Create a beautiful living space with our Room 1 design.</p>
          <NavLink to="/Portfolio"><button className="option-button">Portfolio</button></NavLink>
        </div>
        <div className="option">
          <img className="option-image" src={Room2} alt="Option 2" />
          <p className="option-info">Create a beautiful work environment with our Room 2 design.</p>
          <NavLink to="/Parameter"><button className="option-button">Create Design</button></NavLink>
        </div>
      </div>

  
  );
}

export default OptionsDesign;
