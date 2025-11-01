import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMoneyBillWave, FaCreditCard, FaLock } from 'react-icons/fa';

export default function CheckOutBill({ selectedAddress }) {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const { user } = useAuth();
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    setIsProcessing(true);

    if (paymentMethod === 'cod') {
      try {
        const orderResponse = await axios.post('https://urbanfest.onrender.com/payment', {
          amount: totalPrice * 100,
          status: false,
          paymentMethod: 'cod',
        });
        const { order } = orderResponse.data;
        navigate('/payment/successful', { state: { message: 'Order Placed Successfully', orderId: order.orderId } });
      } catch (error) {
        console.log('Error placing COD order:', error);
        setIsProcessing(false);
        return;
      }
    }

    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    try {
      const orderResponse = await axios.post(
        'https://urbanfest.onrender.com/payment',
        {
          amount: totalPrice * 100,
          status: false,
          paymentMethod,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { order } = orderResponse.data;

      const paymentPromise = new Promise((resolve, reject) => {
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: totalPrice * 100,
          currency: order.currency,
          name: 'UrbanFest',
          description: 'Payment for order',
          order_id: order.orderId,
          handler: function (response) {
            resolve(response);
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: '7394948355',
          },
          theme: {
            color: '#B88E2F',
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
              reject(new Error('Payment cancelled'));
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      });

      await paymentPromise;
      navigate('/payment/successful', {
        state: { message: 'Payment Successful', orderId: order.orderId },
      });
    } catch (error) {
      console.log('Error in payment:', error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    axios
      .get('https://urbanfest.onrender.com/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setItems(response.data);
        const products = response.data;

        let calculatedSubtotal = products.reduce(
          (acc, curr) => acc + curr.productId.price * curr.quantity,
          0
        );

        const discountAmount = calculatedSubtotal * 0.1;
        const subtotalAfterDiscount = calculatedSubtotal - discountAmount;
        const shipping = calculatedSubtotal < 10000 ? 200 : 0;

        setSubtotal(calculatedSubtotal);
        setDiscount(discountAmount);
        setShippingFee(shipping);
        setTotalPrice(subtotalAfterDiscount + shipping);
      })
      .catch((err) => console.log(err));
  }, [user, navigate, token]);


  return (
    <div className="lg:w-4/12 w-full mt-8 lg:mt-0">
      <div className="border-gray-200 border rounded-xl p-4 bg-[#F9F1E7] sticky top-24">

        {/* Payment Method Selection with Total Amount */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
            <div className="text-right">
              <p className="text-xs text-gray-600">Total Amount</p>
              <p className="text-xl font-bold text-[#B88E2F]">
                ₹{totalPrice.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {/* Online Payment */}
            <div
              onClick={() => setPaymentMethod('online')}
              className={`relative overflow-hidden border rounded-lg p-4 cursor-pointer transition-all duration-200 ${paymentMethod === 'online'
                ? 'border-[#B88E2F] bg-[#FFF9F0]'
                : 'border-gray-300 hover:border-[#d4a574] hover:bg-gray-50'
                }`}
            >
              {/* Most Used Badge */}
              <div className="absolute -top-0 -right-0">
                <div className="bg-gradient-to-r from-[#B88E2F] to-[#9c7728] text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                  MOST USED
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'online'
                      ? 'border-[#B88E2F] bg-[#B88E2F]'
                      : 'border-gray-300 border'
                      }`}
                  >
                    {paymentMethod === 'online' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-[#B88E2F] text-lg" />
                    <span className="font-semibold text-gray-900">Online Payment</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    UPI, Cards, Netbanking, Wallets
                  </p>
                </div>

                {paymentMethod === 'online' && (
                  <FaCheckCircle className="text-[#B88E2F] text-xl" />
                )}
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setPaymentMethod('cod')}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${paymentMethod === 'cod'
                ? 'border-[#B88E2F] bg-[#FFF9F0]'
                : 'border-gray-300 border hover:border-[#d4a574] hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod'
                      ? 'border-[#B88E2F] bg-[#B88E2F]'
                      : 'border-gray-300'
                      }`}
                  >
                    {paymentMethod === 'cod' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <FaMoneyBillWave className="text-[#B88E2F] text-lg" />
                    <span className="font-semibold text-gray-900">Cash on Delivery</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Pay on delivery.
                  </p>
                </div>

                {paymentMethod === 'cod' && (
                  <FaCheckCircle className="text-[#B88E2F] text-xl" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          disabled={isProcessing || items.length === 0}
          className={`w-full py-4 font-semibold text-white transition-all duration-200 ${isProcessing || items.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#B88E2F] hover:bg-[#9c7728] transform hover:-translate-y-0.5'
            }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Processing...</span>
            </span>
          ) : (
            <span>
              {paymentMethod === 'online' ? 'Proceed to Payment' : 'Place Order'}
            </span>
          )}
        </button>

        {/* Security Note */}
        <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
          <FaLock className="text-green-500 mt-0.5 flex-shrink-0" />
          <p>
            {paymentMethod === 'online'
              ? 'Secure payment powered by Razorpay'
              : 'Pay securely with cash on delivery'}
          </p>
        </div>
      </div>
    </div>
  );
}