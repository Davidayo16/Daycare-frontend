import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBilling } from "../Redux/Actions/BillingActions";
import { loadStripe } from "@stripe/stripe-js";
const Billing = () => {
  const dispatch = useDispatch();
  const billingDetails = useSelector((state) => state.billingDetails);
  const { loading, error, billing } = billingDetails;
  console.log(billing);

  // const { booksFee, tuitionFee, activityFee, _id: billingId } = billing;
  const billingId = billing?._id;
  const tuitionFee = billing?.tuitionFee;
  const booksFee = billing?.booksFee;
  const activityFee = billing?.activityFee;
  const [loadingPayment, setLoadingPayment] = useState(false);

  const childLogin = useSelector((state) => state.childLogin);
  const { childInfo } = childLogin;
  console.log("USER INFO", childInfo);
  useEffect(() => {
    dispatch(getBilling(childInfo?._id));
  }, [dispatch]);

  const timestamp = billing?.dueDate;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString(); // Convert to local time zone

  const totalAmount =
    billing?.booksFee + billing?.tuitionFee + billing?.activityFee;

  const handlePayment = async () => {
    setLoadingPayment(true);

    try {
      // Fetch the session ID from your server
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billingId,
          booksFee,
          tuitionFee,
          activityFee,
        }),
      });
      console.log(response);
      const session = await response.json();

   

      // Initialize Stripe
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
      // Redirect to Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
        alert("Error during checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      alert("Error during checkout. Please try again.");
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <div className="billing-section">
      <h4>SESSION: {billing?.session}</h4>
      <h4>DUE DATE: {formattedDate}</h4>
      <h2 className="mt-4">Billing Details</h2>
      <div className="child-table-container">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="table-row">
              <td>Books Fee</td>
              <td>${billing?.booksFee}</td>
            </tr>
            <tr className="table-row">
              <td>Tuition Fee</td>
              <td>${billing?.tuitionFee}</td>
            </tr>
            <tr className="table-row">
              <td>Activity Fee</td>
              <td>${billing?.activityFee}</td>
            </tr>

            <tr className="table-row">
              <td>Payment Status</td>
              <td
                style={{
                  backgroundColor: billing?.isPaid ? "green" : "red",
                  color: "white",
                }}
              >
                {billing?.isPaid ? "Paid" : "Not Paid"}
              </td>
            </tr>
            <tr className="total-row">
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>${totalAmount}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {!billing?.isPaid && (
        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={loadingPayment}
        >
          {loadingPayment ? "Processing..." : "Pay Now"}
        </button>
      )}
    </div>
  );
};

export default Billing;
