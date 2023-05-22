import React, { useState } from 'react';
import  popupscreen from './popupscreen.css';
function PopupScreen() {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Open Popup Screen</button>
      {showPopup && (
        <div className="popup-screen">
          <div className="popup-content">
            <h2>Popup Screen</h2>
            <p>Here is some content for the popup screen.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupScreen;
