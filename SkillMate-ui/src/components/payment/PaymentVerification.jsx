import React, { useEffect } from 'react';
import axios from 'axios';

const PaymentVerification = ({ paymentId }) => {
    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await axios.get(`/payment/verify/${paymentId}`);
                // Handle the response (success or failure)
                if (response.data.success) {
                    alert('Payment successful!');
                } else {
                    alert('Payment failed!');
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
            }
        };

        verifyPayment();
    }, [paymentId]);

    return <div>Verifying payment...</div>;
};

export default PaymentVerification;
