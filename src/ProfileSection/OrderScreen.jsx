import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useAuth } from '../AuthContext';
import OrderCard from './OrderCard';
import RatingPopup from './RatingPopup';

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [ratingPopup, setRatingPopup] = useState({ isOpen: false, product: null, orderId: null });
  const { user } = useAuth();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(' https://urbanfest.onrender.com/orders',
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });

        const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));

        setOrders(sortedOrders);
      } catch (error) {
        console.log('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatShortDate = (date) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const calculateDeliveredByDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7);
    return date;
  };

  const getOrderProgress = (orderDate) => {
    const now = new Date();
    const ordered = new Date(orderDate);
    const daysSinceOrder = Math.floor((now - ordered) / (1000 * 60 * 60 * 24));

    if (daysSinceOrder < 2) return 'ordered';
    if (daysSinceOrder < 5) return 'shipped';
    if (daysSinceOrder >= 7) return 'delivered';
    return 'in-transit';
  };

  const openRatingPopup = (product, orderId) => {
    setRatingPopup({ isOpen: true, product, orderId });
  };

  const closeRatingPopup = () => {
    setRatingPopup({ isOpen: false, product: null, orderId: null });
  };

  const handleSubmitRating = async (rating, reviewText) => {
    const response = await axios.post('https://urbanfest.onrender.com/createReview', {
      productId: ratingPopup.product.productId._id,
      orderId: ratingPopup.orderId,
      rating: rating,
      reviewText: reviewText,
    }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    setOrders(prevOrders => prevOrders.map(order => {
      if (order.orderId === ratingPopup.orderId) {
        return {
          ...order,
          cartItems: order.cartItems.map(item =>
            item.productId._id === ratingPopup.product.productId._id
              ? { ...item, reviewId: response.data.review }
              : item
          )
        };
      }
      return order;
    }));
  };

  const toggleOrder = (index) => {
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  if (loading) {
    return (

      <LoadingScreen />

    );
  }

  return (
    <div className="md:rounded-xl md:border md:border-gray-200 ">
      <motion.div className='md:p-6 md:border-b border-gray-100'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl text-center md:text-left font-bold text-gray-800 tracking-tight mb-1 md:mb-2">Order History</h2>
        <p className="text-sm text-gray-500 text-center md:text-left tracking-tight">View and track all your orders.</p>
      </motion.div>

      {/* Orders List */}
      <div className="md:p-4 md:mt-0 mt-10">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              index={index}
              isExpanded={expandedOrder === index}
              onToggle={() => toggleOrder(index)}
              onOpenRating={openRatingPopup}
              formatDate={formatDate}
              formatShortDate={formatShortDate}
              calculateDeliveredByDate={calculateDeliveredByDate}
              getOrderProgress={getOrderProgress}
            />
          ))
        ) : (
          <motion.div
            className="bg-white rounded-lg border border-gray-200 p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            >
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            </motion.div>
            <p className="text-gray-900 font-medium text-lg">No orders found</p>
            <p className="text-gray-500 text-sm mt-2">
              Your order history will appear here once you make a purchase
            </p>
          </motion.div>
        )}

      </div>

      {/* Rating Popup Modal */}
      <RatingPopup
        ratingPopup={ratingPopup}
        onClose={closeRatingPopup}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}