import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing
import './SuccessfulAnimation.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function PaymentSuccessful() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const token = localStorage.getItem('authToken');
    const { state } = location;


    const message = state?.message || "No message available";
    const orderId = state?.orderId || "No order ID available";


    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const formattedDate = format(deliveryDate, 'dd MMM yyyy');

    useEffect(() => {

        if (orderId) {
            // Send request to update order status
            axios.post(`https://urbanfest.onrender.com/payment/success/${orderId}`,{} , {withCredentials: true},  {
                headers: {
                  Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
                },
      },
      
            )
                .then(response => {
                    if (response.data.success) {
                        console.log('Order status updated successfully');
                    } else {
                        console.log('Order already processed or other issue');
                    }
                })
                .catch(error => {
                    console.error('Error updating order status:', error);
                });
        }

        if (!message) {
            navigate('/');
        }
        
        const loadingTimer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        const redirectTimer = setTimeout(() => {
            navigate('/profile/orders');
        }, 10000);


        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    if (loading) {
        return <LoadingScreen />; // Render loading screen while loading state is true
    }

    return (
        <div className="flex flex-col font-inter justify-center items-center min-h-screen space-y-6">
            <div className="success-animation">
                <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                >
                    <circle
                        className="checkmark__circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                    />
                    <path
                        className="checkmark__check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                </svg>
            </div>

            <div className="text-center text-lg text-gray-700">
                <p className="thank-you-message">
                    Order ID: <span className="font-semibold">{orderId}</span> <br />
                    Thank you for your order!
                </p>
                <p className="order-message">
                    Your order will be delivered on <span className="font-semibold">{formattedDate}</span>.
                </p>
            </div>
        </div>
    );
}
