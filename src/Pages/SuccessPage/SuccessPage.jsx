import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./SuccessPage.css"; // Import the CSS file


const SuccessPage = () => {
  useEffect(() => {
    const billingId = new URLSearchParams(window.location.search).get(
      "billingId"
    );
    // You can use billingId for additional logic, e.g., fetching data from the server
  }, []);

  return (
    <div className="success-container">
      <div className="success-content">
        <img src='/images/success.jpg' alt="Success" className="success-image" />
        <h1>Payment Successful</h1>
        <p className="thank-you-message">
          Thank you for your payment! Your transaction was successful.
        </p>

      

        <div className="back-to-home">
          <Link to="/">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
