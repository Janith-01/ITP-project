import React from 'react';
import './LoadingSpinner.css'; // You can create a CSS file for styling the spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
