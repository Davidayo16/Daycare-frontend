import React from "react";
import "./Error.css"; // Import CSS for styling

const Error = ({ variant, children }) => {
  return (
    <div className="error-container mb-3">
      <h3 className="error-message mb-0 w-100">{children}</h3>
    </div>
  );
};

export default Error;
