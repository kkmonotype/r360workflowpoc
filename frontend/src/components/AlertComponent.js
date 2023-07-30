import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

const AlertComponent = ({ message, severity }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    // Set a timer to hide the alert after 3 seconds (adjust the duration as needed)
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Clear the timer when the component unmounts or when showAlert changes to false
    return () => clearTimeout(timeout);
  }, [showAlert]);

  return showAlert ? <div className="alert"><Alert severity={severity}>{message}</Alert></div> : null;
};

export default AlertComponent;
