import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export default function CheckOutBill() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user, logout } = useAuth();
  const [activeradio, setActiveradio] = useState('cash-on-delivery');
  const token = localStorage.getItem('authToken');

  console.log(token);


  const navigate = useNavigate();

  const radioPress = (e) => {
    setActiveradio(e);
  };

  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const placeOrder = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    console.log(totalPrice);


    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }


    try {
      // Create an order on the server
      const orderResponse = await axios.post('https://urbanfest.onrender.com/payment', {
        amount: totalPrice * 100,
        status: false
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
      },
      );

      const { order } = orderResponse.data;
      console.log(order);


      // Create a promise that resolves when payment is successful
      const paymentPromise = new Promise((resolve, reject) => {
        // Razorpay options
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: totalPrice * 100,
          currency: order.currency,
          name: 'UrbanFest',
          description: 'Payment for order',
          order_id: order.orderId
          ,
          handler: function (response) {
            // Resolve the promise when payment is successful
            console.log('Payment Success:', response);
            resolve(response);
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: '7394948355', // Placeholder contact number
          },
          theme: {
            color: '#B88E2F',
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      });

      // Wait for payment to be completed
      const paymentResponse = await paymentPromise;

      // Perform navigation to the success page with the order ID
      navigate('/payment/successful', { state: { message: "Payment Successful", orderId: order.orderId } });

    } catch (error) {
      console.error('Error in payment:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    axios.get("https://urbanfest.onrender.com/cart", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
      },
      withCredentials: true
    })
      .then((response) => {
        setItems(response.data);
        console.log(response.data);

        const products = response.data;
        let totalPricewD = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        totalPricewD = totalPricewD > 10000 ? totalPricewD - 0.1 * totalPricewD : totalPricewD;
        setTotalPrice(totalPricewD);
      })
      .catch((err) => console.log(err));
  }, [user, navigate]);

  return (
    <div className='lg:w-4/12 w-full mt-8'>
      <div className="flex justify-between">
        <div className="item-name">
          <h1 className="text-xl tracking-tight font-semibold mb-5">Products</h1>
        </div>
        <div className="item-price">
          <h1 className="text-xl tracking-tight font-semibold mb-5">Subtotal</h1>
        </div>
      </div>
      {items.length > 0 && items.map((item) => {
        return (
          <div className="flex justify-between mb-3">
            <div className="item-name font-light text-gray-400 w-3/5">
              <span className='text-md'>{item.name} <span className='text-black'> [{item.quantity}]</span></span>
            </div>
            <div className="item-price">
              <span>₹ {parseInt(item.price * item.quantity).toLocaleString('en-IN')}</span>
            </div>
          </div>
        )
      })}
      <div className="flex justify-between mt-5">
        <div className="item-name">
          Total
        </div>
        <div className="item-price text-lg text-[#B88E2F] font-bold">
          ₹ {totalPrice.toLocaleString('en-IN')}
        </div>
      </div>
      <hr className='mt-5 bg-gray-400' />



      {activeradio === 'direct-transfer-bank' && <div>
        <div className="flex items-center mt-5">
          <div className="flex items-center justify-center w-6 h-6 bg-[#B88E2F] rounded-full cursor-pointer">
            <span className="hidden peer-checked:block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <label htmlFor="option1" className="ml-2 text-sm font-medium text-gray-900">Direct Bank Transfer</label>
        </div>
        <div className="text">
          <p className='font-light mt-2 text-gray-500 text-sm'>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>

        </div>
      </div>
      }

      {activeradio === 'cash-on-delivery' && <div>
        <div className="flex items-center mt-5">
          <div className="flex items-center justify-center w-6 h-6 bg-[#B88E2F] rounded-full cursor-pointer">
            <span className="hidden peer-checked:block w-3 h-3 bg-black rounded-full"></span>
          </div>
          <label htmlFor="option1" className="ml-2 text-sm font-medium text-gray-900">Cash on Delivery</label>
        </div>
        <div className="text">
          <p className='font-light mt-2 text-gray-500 text-sm'>
            Payment will be made on delivery. Sit back, relax, and let us handle the rest.
            Our team ensures that your order arrives safely and on time.                                                  </p>

        </div>
      </div>
      }

      <div className="flex items-center mt-5 mb-4">
        <input id="default-radio-1" onClick={() => radioPress('direct-transfer-bank')} type="radio" value="direct-transfer-bank" name="default-radio" className="hidden peer" />
        <label htmlFor="default-radio-1" className="w-4 h-4 flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-full cursor-pointer peer-checked:bg-[#B88E2F] peer-checked:border-[#B88E2F]">
          <span className="hidden peer-checked:block w-3 h-3 bg-white rounded-full"></span>
        </label>
        <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Direct Bank Transfer</label>
      </div>
      <div className="flex items-center">
        <input id="default-radio-2" onClick={() => radioPress('cash-on-delivery')} type="radio" value="cash-on-delivery" name="default-radio" className="hidden peer" />
        <label htmlFor="default-radio-2" className="w-4 h-4 flex items-center justify-center bg-gray-100 border-2 border-gray-300 rounded-full cursor-pointer peer-checked:bg-[#B88E2F] peer-checked:border-[#B88E2F]">
          <span className="hidden peer-checked:block w-3 h-3 bg-white rounded-full"></span>
        </label>
        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash on Delivery</label>
      </div>



      <div className="text mt-5">
        <p className='font-light mt-2 text-gray-500 text-sm'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>
      </div>
      <div className="flex justify-center py-6">
        <button
          onClick={placeOrder}
          className="bg-[#B88E2F] hover:bg-[#9c7728] h-12 w-40 px-3 text-white text-sm tracking-wider font-semibold hover:text-white transition-colors duration-300 ease-in-out"
          type="submit"
        >
          Place Order <FaArrowRight className="inline ml-2" />
        </button>
      </div>

    </div>
  );
}
