
import { FaArrowRight } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import Carousel from './Carousels';
import { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const ParentCarousel = () => {

  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state]);

  useEffect(() => {
    if (message) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);


  return (


    <div className='lg:bg-[#FCF8F3] bg-white'>
      {/* Desktop Header */}
      {showNotification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ right: '15%', transform: 'translateX(-80%)' }}
          className="fixed top-20 md:hidden block bg-[#B88E2F] rounded-lg text-sm text-white text-center px-4 py-2 font-inter z-50"
        >
          {message}
        </motion.div>

      )}

      <div className="hidden lg:flex flex-row mx-20 py-10 justify-start bg-[#FCF8F3]">
        <div className="w-5/12 mt-32 mb-10">
          <h1 className='mb-2 font-bold text-4xl tracking-tighter text-gray-700'>
            <span className='text-[#B88E2F]'>100+ </span>
            Beautiful rooms <br /> inspiration.
          </h1>
          <p className='mb-5 text-md tracking-tight'>
            Our designer already made a lot of beautiful <br />
            prototype of rooms that inspire you.
          </p>
          <Link to="/shop" >
          <button className='bg-[#B88E2F] h-12 w-40 px-3 text-white text-sm tracking-wider font-semibold flex items-center justify-center gap-2 hover:bg-[#a07828] transition-colors'>
            Explore More <FaArrowRight size={16} />
          </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Carousel />
        </div>
      </div>

      {/* Mobile: Just the Carousel (full height) */}
      <div className="lg:hidden">
        <Carousel />
      </div>
    </div>
  );
};

export default ParentCarousel;
