import React, { useState } from 'react';
import './Payment.css'; // Ensure this path is correct based on your project structure

const payments = [
  { payment_id: 1, amount: 500, status: 'Pending', booking_id: 101 },
  { payment_id: 2, amount: 1200, status: 'Pending', booking_id: 102 },
  { payment_id: 3, amount: 750, status: 'Failed', booking_id: 103 },
  { payment_id: 4, amount: 1000, status: 'Completed', booking_id: 104 },
  { payment_id: 5, amount: 300, status: 'Pending', booking_id: 105 },
  // Add more payments as needed
];

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
    setShowDetails(true);
  };

  const handleMakePayment = async () => {
    try {
      const payload = { payment_id: selectedPayment.payment_id, amount: selectedPayment.amount };

      const response = await fetch('/make-payment-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Payment successful, show alert message
        alert('Thank you for using our service. Your payment details will be sent to your registered email.');
        // Optionally, update the payment status in the UI
        setSelectedPayment({ ...selectedPayment, status: 'Completed' });
        setShowDetails(false); // Close the details on successful payment
      } else {
        console.error('Failed to process payment');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <div className="payment-list-container">
        {payments.map((payment) => (
          <div
            key={payment.payment_id}
            className="payment-card"
            onClick={() => handlePaymentClick(payment)}
          >
            <div className="payment-card-text">
              <p>Payment ID: {payment.payment_id}</p>
              <p>Amount: ${payment.amount}</p>
              <p>Status: {payment.status}</p>
              <p>Booking ID: {payment.booking_id}</p>
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedPayment && (
        <div className="details-container">
          <h3>Payment Details</h3>
          <p><strong>Payment ID:</strong> {selectedPayment.payment_id}</p>
          <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
          <p><strong>Status:</strong> {selectedPayment.status}</p>
          <p><strong>Booking ID:</strong> {selectedPayment.booking_id}</p>
          {selectedPayment.status !== 'Completed' ? (
            <button onClick={handleMakePayment}>Make Payment</button>
          ) : (
            <p className="completed-message">Payment already completed</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
