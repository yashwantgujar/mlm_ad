import React from 'react';
import './PromotionPopup.css'; // Create this CSS file

const PromotionPopup = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title || 'Congratulations!'}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PromotionPopup;