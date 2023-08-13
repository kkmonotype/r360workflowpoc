import React from 'react';

const ProgressBar = ({ completion }) => {
  const progressBarStyle = {
    width: `${completion}%`,
    height: '4px',
    backgroundColor: '#F3D221', 
    borderRadius: '4px',
    transition: 'width 0.5s ease-in-out',
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={progressBarStyle}></div>
    </div>
  );
};

export default ProgressBar;