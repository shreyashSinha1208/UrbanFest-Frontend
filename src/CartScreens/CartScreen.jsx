import { FaTrash } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import EmptyCart from '../assets/EmptyCart.png';
import CartTotal from './CartTotal';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import { useAuth } from '../AuthContext';
import { replace, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import emptyWishlistAnimation from '../assets/Empty.json'

export default function CartScreen() {
          const navigate = useNavigate();
          const [cartItems, setCartItems] = useState([]);
          const [price, setPrice] = useState(0);
          const [loading, setLoading] = useState(true);
          const { user, updateUser } = useAuth();

          const fetchCartItems = async () => {
                    try {
                              const response = await axios.get('http://localhost:5000/cart', {
                                        withCredentials: true,
                                        headers: {
                                                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                                        },
                              });
                              
                              const items = response.data || [];
                              setCartItems(items);
                              const total = items.reduce(
                                        (acc, item) => acc + item.productId.price * item.quantity,
                                        0
                              );
                              setPrice(total);

                    } catch (error) {
                              console.log('Error fetching cart items:', error);
                    }
          };


          useEffect(() => {
                    if (!user) {
                              navigate('/login',
                                        { state: { message: "Please login to access cart" }, replace: true });
                              return;
                    }

                    fetchCartItems().finally(() => {
                              setTimeout(() => {
                                        setLoading(false);
                              }, 500);
                    });
          }, [user, navigate]);


          const handledeleteItem = async (cartItemId) => {
                    try {     
                              const response = await axios.delete(`http://localhost:5000/cart/${cartItemId}`, {
                                        withCredentials: true,
                                        headers: {
                                                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                                        },
                              });
                              const updatedUser = response.data.user;
                              updateUser(updatedUser);
                              await fetchCartItems();
                    } catch (error) {
                              console.log('Error deleting cart item:', error);
                    }
          };


          const containerVariants = {
                    hidden: { opacity: 0 },
                    visible: {
                              opacity: 1,
                              transition: {
                                        staggerChildren: 0.1
                              }
                    }
          };

          const itemVariants = {
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                        duration: 0.4,
                                        ease: "easeOut"
                              }
                    },
                    exit: {
                              opacity: 0,
                              x: -100,
                              transition: {
                                        duration: 0.3
                              }
                    }
          };

          const headerVariants = {
                    hidden: { opacity: 0, y: -20 },
                    visible: {
                              opacity: 1,
                              y: 0,
                              transition: {
                                        duration: 0.5
                              }
                    }
          };

          return (
                    <div>
                              {loading ? (
                                        <LoadingScreen />
                              ) : (
                                        <motion.div
                                                  initial="hidden"
                                                  animate="visible"
                                                  variants={containerVariants}
                                                  className={` px-4 md:px-8 py-8 lg:px-20 bg-white ${cartItems.length > 0 ? 'lg:flex justify-between lg:gap-10' : ''}`}
                                        >
                                                  <div className={`product-desc ${cartItems.length > 0 ? 'w-full lg:w-8/12' : 'w-full'}`}>
                                                            {cartItems.length > 0 ? (
                                                                      <>
                                                                                {/* Desktop Header */}
                                                                                <motion.div
                                                                                          variants={headerVariants}
                                                                                          className="lg:flex hidden flex-col items-center justify-between"
                                                                                >
                                                                                          <div className="lg:flex w-full items-center rounded-xl border border-gray-300 justify-between bg-[#F9F1E7] mb-5 py-4 px-3">
                                                                                                    <div className='flex items-center w-[37%]'>
                                                                                                              <p className="font-semibold text-black">Item</p>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <p className="font-semibold text-black">Price(₹)</p>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <p className="font-semibold text-black">Color</p>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <div className="quantity">
                                                                                                                        <p className="font-semibold text-black">Quantity</p>
                                                                                                              </div>
                                                                                                    </div>
                                                                                                    <div className='w-[15%]'>
                                                                                                              <p className="font-semibold text-black">SubTotal</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </motion.div>

                                                                                {/* Cart Items */}
                                                                                <div className="pt-2 lg:flex flex-col items-center justify-between">
                                                                                          <AnimatePresence mode="popLayout">
                                                                                                    {cartItems.map((item, index) => (
                                                                                                              <motion.div
                                                                                                                        key={item._id}
                                                                                                                        variants={itemVariants}
                                                                                                                        initial="hidden"
                                                                                                                        animate="visible"
                                                                                                                        exit="exit"
                                                                                                                        layout
                                                                                                                        className="flex flex-col lg:flex-row w-full lg:items-center justify-between mb-4 md:mb-5 p-4 md:p-5 lg:py-4 lg:px-3 border rounded-2xl bg-white"
                                                                                                              >
                                                                                                                        {/* Mobile/Tablet Layout */}
                                                                                                                        <div className="lg:hidden w-full">
                                                                                                                                  {/* Product Image and Name */}
                                                                                                                                  <div className="flex items-start gap-4 mb-4">
                                                                                                                                            <motion.img
                                                                                                                                                      whileHover={{ scale: 1.05 }}
                                                                                                                                                      transition={{ duration: 0.2 }}
                                                                                                                                                      className="h-24 w-24 md:h-28 md:w-28 rounded-xl object-cover flex-shrink-0 border"
                                                                                                                                                      src={item.productId.img}
                                                                                                                                                      alt="product-image"
                                                                                                                                            />
                                                                                                                                            <div className="flex-1 min-w-0">
                                                                                                                                                      <p className="font-bold text-gray-800 text-base md:text-lg mb-2 line-clamp-2 tracking-tight">
                                                                                                                                                                {item.productId.name}
                                                                                                                                                      </p>
                                                                                                                                                      <p className="text-sm text-gray-500 mb-2">Size: <span className='tracking-tighter fold-bold text-gray-800'>{item.size}</span></p>
                                                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                                                                <span className="text-xs text-gray-500">Color:</span>
                                                                                                                                                                <motion.div
                                                                                                                                                                          whileHover={{ scale: 1.2 }}
                                                                                                                                                                          className="rounded-full h-6 w-6 border-2 border-gray-300"
                                                                                                                                                                          style={{ backgroundColor: item.color }}
                                                                                                                                                                ></motion.div>
                                                                                                                                                      </div>
                                                                                                                                            </div>
                                                                                                                                  </div>

                                                                                                                                  {/* Price and Quantity Row */}
                                                                                                                                  <div className="flex items-center justify-between mb-2 pb-4 border-b border-gray-200">
                                                                                                                                            <div>
                                                                                                                                                      <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                                                                                                                                                      <p className="font-semibold text-gray-700 text-base md:text-lg">
                                                                                                                                                                ₹{(parseInt(item.productId.price)).toLocaleString('en-IN')}
                                                                                                                                                      </p>
                                                                                                                                            </div>
                                                                                                                                            <div>
                                                                                                                                                      <p className="text-xs text-gray-500 mb-1 text-center">Quantity</p>
                                                                                                                                                                <p className="font-semibold text-gray-800 text-base text-center">{item.quantity}</p>
                                                                                                                                                      
                                                                                                                                            </div>
                                                                                                                                  </div>

                                                                                                                                  {/* Subtotal and Delete Row */}
                                                                                                                                  <div className="flex items-center justify-between">
                                                                                                                                            <div>
                                                                                                                                                      <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                                                                                                                                                      <p className="font-bold text-black text-lg md:text-xl">
                                                                                                                                                                ₹{(item.productId.price * item.quantity).toLocaleString('en-IN')}
                                                                                                                                                      </p>
                                                                                                                                            </div>
                                                                                                                                            <motion.button
                                                                                                                                                      whileHover={{ scale: 1.1 }}
                                                                                                                                                      whileTap={{ scale: 0.9 }}
                                                                                                                                                      onClick={() => handledeleteItem(item._id)}
                                                                                                                                                      className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                                                                                                                            >
                                                                                                                                                      <FaTrash className="text-sm" />
                                                                                                                                                      <span className="text-sm font-medium">Remove</span>
                                                                                                                                            </motion.button>
                                                                                                                                  </div>
                                                                                                                        </div>

                                                                                                                        {/* Desktop Layout */}
                                                                                                                        <div className="hidden lg:flex w-full items-center justify-between">
                                                                                                                                  <div className="flex items-center w-[35%]">
                                                                                                                                            <motion.img
                                                                                                                                                      whileHover={{ scale: 1.05 }}
                                                                                                                                                      transition={{ duration: 0.2 }}
                                                                                                                                                      className="h-32 w-32 rounded-xl object-cover"
                                                                                                                                                      src={item.productId.img}
                                                                                                                                                      alt="product-image"
                                                                                                                                            />
                                                                                                                                            <div className="ml-4">
                                                                                                                                                      <p className="font-medium text-gray-400">
                                                                                                                                                                {item.productId.name} <span>[{item.size}]</span>
                                                                                                                                                      </p>
                                                                                                                                            </div>
                                                                                                                                  </div>

                                                                                                                                  <div className="w-[10%] text-center">
                                                                                                                                            <p className="font-semibold text-gray-400 tracking-tight">
                                                                                                                                                      ₹{(parseInt(item.productId.price)).toLocaleString('en-IN')}
                                                                                                                                            </p>
                                                                                                                                  </div>

                                                                                                                                  <div>
                                                                                                                                            <motion.div
                                                                                                                                                      whileHover={{ scale: 1.2 }}
                                                                                                                                                      className="rounded-full h-5 w-5"
                                                                                                                                                      style={{ backgroundColor: item.color }}
                                                                                                                                            ></motion.div>
                                                                                                                                  </div>

                                                                                                                                  <div className="text-center">
                                                                                                                                            <div className="border-2 px-3 py-1 rounded-lg border-gray-400 inline-block">
                                                                                                                                                      <p className="font-medium text-gray-800">{item.quantity}</p>
                                                                                                                                            </div>
                                                                                                                                  </div>

                                                                                                                                  <div className="w-[15%] text-center">
                                                                                                                                            <p className="font-medium text-black tracking-tight">
                                                                                                                                                      ₹{(item.productId.price * item.quantity).toLocaleString('en-IN')}
                                                                                                                                                      &nbsp;&nbsp;
                                                                                                                                                      <motion.span
                                                                                                                                                                whileHover={{ scale: 1.2 }}
                                                                                                                                                                whileTap={{ scale: 0.9 }}
                                                                                                                                                                className="text-[#B88E2F] cursor-pointer"
                                                                                                                                                      >
                                                                                                                                                                <FaTrash
                                                                                                                                                                          onClick={() => handledeleteItem(item._id)}
                                                                                                                                                                          className="inline-block"
                                                                                                                                                                />
                                                                                                                                                      </motion.span>
                                                                                                                                            </p>
                                                                                                                                  </div>
                                                                                                                        </div>
                                                                                                              </motion.div>
                                                                                                    ))}
                                                                                          </AnimatePresence>
                                                                                </div>
                                                                      </>
                                                            ) : (
                                                                      <motion.div
                                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                                animate={{ opacity: 1, scale: 1 }}
                                                                                transition={{ duration: 0.5 }}
                                                                                className="flex flex-col justify-center pt-8 items-center h-[50vh] w-full"
                                                                      >
                                                                                <Lottie
                                                                                          animationData={emptyWishlistAnimation}
                                                                                          loop={true}
                                                                                          style={{ width: 300, height: 300 }}
                                                                                />
                                                                      </motion.div>
                                                            )}
                                                  </div>
                                                  {cartItems.length > 0 && (
                                                            <motion.div
                                                                      initial={{ opacity: 0, x: 20 }}
                                                                      animate={{ opacity: 1, x: 0 }}
                                                                      transition={{ duration: 0.5, delay: 0.2 }}
                                                                      className='lg:w-4/12 w-full mt-10 lg:mt-0'
                                                            >
                                                                      <CartTotal totalPrice={price} />
                                                            </motion.div>
                                                  )}
                                        </motion.div>
                              )}
                    </div>
          );
}