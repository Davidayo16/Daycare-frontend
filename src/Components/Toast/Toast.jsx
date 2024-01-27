import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./Toast.css"; // Import CSS for styling

const Toast = ({ showToast, type, message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showToast);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <CSSTransition in={show} timeout={300} classNames="toast" unmountOnExit>
      <div className={`toast ${type}`}>
        <span>{message}</span>
      </div>
    </CSSTransition>
  );
};

export default Toast;
