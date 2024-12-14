import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('RS'); // Assuming RS (Indian Rupies) as the currency
    const [paymentStatus, setPaymentStatus] = useState(null);

    const handlePayment = async () => {
        try {
            const response = await axios.post('/payment/create', { amount, currency });
            // Assuming the response has a payment ID or redirect URL
            const paymentId = response.data.paymentId;

            // Redirect user to Razer Pay's payment page (or handle as required)
            window.location.href = `https://checkout.razerpay.com/${paymentId}`;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div>
            <h1>Make a Payment</h1>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay</button>

            {paymentStatus && <p>{paymentStatus}</p>}
        </div>
    );
};

export default Payment;
