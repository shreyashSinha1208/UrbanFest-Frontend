import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import ShowNavbar from './ShowNavbar';
import RelatedProducts from './RelatedProducts';
import Lottie from 'lottie-react';
import invalidProduct from "../assets/Error.json";
import StarRating from './StarRating';
import Review from './Review';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Show() {

  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedSize, setSelectedSize] = useState('L');
  const [product, setProduct] = useState(null); // Changed from [] to null
  const [isLoading, setIsLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const [isError, setIsError] = useState(false);

  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const token = localStorage.getItem('authToken');
  const { updateUser } = useAuth();
  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://urbanfest.onrender.com/products/show/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data || Object.keys(response.data).length === 0) {
          setIsError(true);
          setIsLoading(false);
          return;
        }
        setProduct(response.data);
        setIsLoading(false);
        checkCartAndWishlistStatus(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [productId, token]);

  useEffect(() => {
    if (product?._id) {
      checkCartAndWishlistStatus(product);
    }
  }, [selectedColor, selectedSize]);

  const checkCartAndWishlistStatus = async (productData) => {
    try {
      const cartRes = await axios.get('https://urbanfest.onrender.com/cart', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const cartItem = cartRes.data.find(
        (item) =>
          item.productId._id === productData._id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (cartItem) {
        setIsInCart(true);
        setCartItemId(cartItem._id);
      } else {
        setIsInCart(false);
        setCartItemId(null);
      }

      const wishlistRes = await axios.get('https://urbanfest.onrender.com/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      const wishlistItem = wishlistRes.data.find(
        (item) => item._id === productData._id
      );

      if (wishlistItem) {
        setIsInWishlist(true);
        setWishlistItemId(wishlistItem._id);
      } else {
        setIsInWishlist(false);
        setWishlistItemId(null);
      }
    } catch (error) {
      console.log('Error checking cart/wishlist status:', error);
    }
  };

  const colors = [
    { color: '#816DFA' },
    { color: '#000000' },
    { color: '#B88E2F' },
  ];

  const sizes = [
    { size: 'L' },
    { size: 'XL' },
    { size: 'XS' },
  ];

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);

  const toggleCart = async () => {
    setIsCartLoading(true);
    try {
      if (isInCart && cartItemId) {
        const response = await axios.delete(`https://urbanfest.onrender.com/cart/${cartItemId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        updateUser(response.data.user);
        setIsInCart(false);
        setCartItemId(null);
      } else {
        const response = await axios.post(
          'https://urbanfest.onrender.com/cart',
          {
            productId: product._id,
            color: selectedColor,
            size: selectedSize,
            quantity: 1,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        updateUser(response.data.user);
        await checkCartAndWishlistStatus(product);
      }
    } catch (error) {
      console.log('Error toggling cart:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  const toggleWishlist = async () => {
    setIsWishlistLoading(true);
    try {
      if (isInWishlist) {
        console.log(product._id)
        const response = await axios.delete(`https://urbanfest.onrender.com/wishlist/${product._id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        updateUser(response.data.user);
        setIsInWishlist(false);
        setWishlistItemId(null);
      } else {
        const response = await axios.post(
          'https://urbanfest.onrender.com/wishlist',
          { productId: product._id },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        updateUser(response.data.user);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.log('Error toggling wishlist:', error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Show loading state
  if (isLoading) {
    return (
       <LoadingScreen/>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Lottie animationData={invalidProduct} loop={true} className="w-80 h-80" />
      </div>
    );
  }

  // Only render when product exists
  if (!product) {
    return null;
  }

  return (
    <div className="">
      <ShowNavbar productName={product.name} id="top-section" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="lg:grid lg:grid-cols-2 lg:px-20 px-5 lg:pt-12 pt-10 pb-10 bg-white"
      >
        <motion.div
          className="lg:w-10/12 lg:mb-0 mb-5 w-full lg:h-[27rem] h-[20rem]"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src={product.img}
            alt={product.name}
            className="bg-[#F9F1E7] border rounded-2xl h-full cursor-pointer select-none"
            draggable={false}
          />
        </motion.div>

        <div>
          <div className="items-start">
            <h1 className="text-3xl font-semibold tracking-tighter">
              {product.name}
            </h1>
            <h2 className="mt-2 text-xl tracking-tighter font-bold text-gray-400 flex flex-wrap items-center gap-2">
              <span>
                ₹ {parseInt(product.price).toLocaleString('en-IN')}
              </span>
              <span className="line-through text-gray-400">
                ₹ {parseInt(product.oldPrice).toLocaleString('en-IN')}
              </span>
              <span className="text-green-600 tracking-wide font-bold text-sm flex items-center gap-1">
                <FontAwesomeIcon icon={faArrowDown} />
                {(
                  ((parseInt(product.oldPrice) - parseInt(product.price)) /
                    parseInt(product.oldPrice)) *
                  100
                ).toFixed(2)}
                %
              </span>
            </h2>

            <div className="lg:flex justify-between items-center mt-2 lg:w-7/12 flex-wrap gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="review-stars"
              >
                <StarRating rating={product.rating} />
              </motion.div>
            </div>

            <div className="mt-4 lg:w-10/12">
              <p className="text-sm tracking-tight">{product.description}</p>
            </div>

            <div className="size mt-4">
              <p className="text-gray-400 text-sm">Size</p>
              <div className="flex lg:w-3/12 w-6/12 mt-4 gap-3 justify-start flex-wrap">
                {sizes.map((sizeObj, index) => (
                  <motion.div
                    key={index}
                    onClick={() => handleSizeSelect(sizeObj.size)}
                    className={`rounded-md cursor-pointer py-1 select-none transition-colors duration-300 ${selectedSize === sizeObj.size
                      ? 'bg-[#B88E2F] text-white'
                      : 'bg-[#F9F1E7] text-black'
                      } ${sizeObj.size === 'L' ? 'px-3' : 'px-2'} shadow-sm`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedSize === sizeObj.size}
                  >
                    {sizeObj.size}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="color mt-4">
              <p className="text-gray-400 text-sm">Color</p>
              <div className="flex lg:w-2/12 w-4/12 mt-4 justify-between gap-3 flex-wrap">
                {colors.map((colorObj, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-full cursor-pointer h-6 w-6 select-none transition-shadow duration-300 ${selectedColor === colorObj.color
                      ? 'ring-2 ring-[#B88E2F]'
                      : ''
                      }`}
                    style={{ backgroundColor: colorObj.color }}
                    onClick={() => handleColorSelect(colorObj.color)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedColor === colorObj.color}
                  />
                ))}
              </div>
            </div>

            <div className="final-div mt-8">
              <div className="flex lg:w-6/12 w-full gap-3">
                <motion.div
                  className={`flex items-center justify-center cursor-pointer border-2 rounded-lg py-3 w-full ${isInCart
                    ? 'bg-[#B88E2F] text-white border-[#B88E2F]'
                    : 'border-[#B88E2F] bg-white text-[#B88E2F]'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor: isInCart ? '#B88E2F' : '#fff',
                    borderColor: '#B88E2F',
                    color: isInCart ? '#fff' : '#B88E2F',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={toggleCart}
                    disabled={isCartLoading}
                    className="w-full font-medium text-sm flex items-center justify-center gap-2"
                    aria-label={isInCart ? 'Remove from Cart' : 'Add to Cart'}
                  >
                    {isCartLoading && !isInCart ? (
                      <motion.span
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="inline-block"
                      >
                        🎉
                      </motion.span>
                    ) : isCartLoading ? (
                      'LOADING...'
                    ) : isInCart ? (
                      'REMOVE FROM CART'
                    ) : (
                      'ADD TO CART'
                    )}
                  </button>
                </motion.div>

                <motion.div
                  className={`relative flex items-center justify-center cursor-pointer border-2 rounded-lg py-3 px-4 ${isInWishlist
                    ? 'bg-red-500 text-white border-red-500'
                    : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={toggleWishlist}
                  aria-label={
                    isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'
                  }
                >
                  <AnimatePresence>
                    {isInWishlist && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            animate={{
                              opacity: 0,
                              scale: 0,
                              x: Math.cos((i / 6) * 2 * Math.PI) * 20,
                              y: Math.sin((i / 6) * 2 * Math.PI) * 20,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="absolute text-red-500 text-xl pointer-events-none select-none"
                          >
                            ❤️
                          </motion.span>
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isWishlistLoading
                        ? [1, 1.3, 1]
                        : isInWishlist
                          ? [1, 1.2, 1]
                          : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: isWishlistLoading ? Infinity : 1,
                      ease: 'easeInOut',
                    }}
                  >
                    {isWishlistLoading ? (
                      <IoIosHeart className="animate-pulse text-3xl" />
                    ) : isInWishlist ? (
                      <IoIosHeart className="text-3xl" />
                    ) : (
                      <IoIosHeartEmpty className="text-3xl" />
                    )}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <Review product={product} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <RelatedProducts product={product} />
      </motion.div>
    </div>
  );
}