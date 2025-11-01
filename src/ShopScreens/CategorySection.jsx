import axios from 'axios';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { useState, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../AuthContext';


const CategorySection = ({ category, products, showProduct, wishlist, setWishlist, user, token, index }) => {
  const [loadingProducts, setLoadingProducts] = useState([]);
  const [showLeftArrow1, setShowLeftArrow1] = useState(false);
  const [showRightArrow1, setShowRightArrow1] = useState(true);
  const [showLeftArrow2, setShowLeftArrow2] = useState(false);
  const [showRightArrow2, setShowRightArrow2] = useState(true);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const { updateUser } = useAuth();

  const handleScroll = (ref, setLeft, setRight) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeft(scrollLeft > 10);
      setRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleWishlist = async (product) => {
    if (!user || !token) return;

    setLoadingProducts(prev => [...prev, product._id])
    const isInWishlist = wishlist.some(item => item._id === product._id);

    if (isInWishlist) setWishlist(prev => prev.filter(item => item._id !== product._id));
    else setWishlist(prev => [...prev, product]);

    try {
      if (isInWishlist) {
        const response = await axios.delete(`http://localhost:5000/wishlist/${product._id}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        updateUser(response.data.user);
      } else {
        const response = await axios.post(
          'http://localhost:5000/wishlist',
          { productId: product._id },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        updateUser(response.data.user);
      }
    } catch (error) {
      console.log('Error toggling wishlist:', error);
      if (isInWishlist) {
        setWishlist(prev => [...prev, product]);
      } else {
        setWishlist(prev => prev.filter(item => item._id !== product._id));
      }
    } finally {
      setLoadingProducts(prev => prev.filter(id => id !== product._id));
    }
  };

  const isInWishlist = (productId) => wishlist.some(item => item._id === productId);

  const midPoint = Math.ceil(products.length / 2);

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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="pb-16"
    >
      <div className="mb-10 py-2 sticky bg-white/95 backdrop-blur-lg top-[60px] lg:top-[80px] z-30">
        <section
          id={category}
          className="flex items-center gap-4 lg:justify-start justify-center py-1"
        >
          <div className="h-[2px] w-12 bg-[#B88E2F] hidden lg:block"></div>
          <h2 className="lg:text-3xl text-2xl tracking-tight text-gray-800 font-bold">
            {category.charAt(0).toUpperCase() + category.slice(1)}s
          </h2>
          <div className="h-[2px] lg:flex-1 flex-grow bg-gradient-to-r from-[#B88E2F] to-transparent"></div>

        </section>
        <p className="text-gray-500 text-sm text-left lg:ml-16 tracking-tight">
          Explore our collection of premium {category.toLowerCase()} furniture.
        </p>

      </div>

      {/* Desktop Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="hidden lg:grid lg:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            onClick={() => showProduct(product._id)}
            className="group cursor-pointer bg-white border rounded-2xl overflow-hidden transition-all duration-300 relative"
          >
            <div className='relative overflow-hidden'>
              {/* Image */}
              <div className='relative h-64 overflow-hidden bg-gray-100'>
                <img
                  src={product.img}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  alt={product.name}
                />

                {/* Hover Overlay - optional */}
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
                  <div className='bg-white text-gray-800 p-3 rounded-full hover:bg-[#B88E2F] hover:text-white transition-colors duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </div>
                </div>
              </div>

              {/* Heart Icon - Desktop */}
              {user && (
                <motion.div
                  className="absolute top-4 right-4 z-20 text-2xl bg-white/90 backdrop-blur-sm p-2 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                >
                  <AnimatePresence mode="wait">
                    {loadingProducts.includes(product._id) ? (
                      <motion.div
                        key="loading"
                        initial={{ scale: 0.8, rotate: 0 }}
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IoIosHeart className="cursor-pointer text-red-500" />
                      </motion.div>
                    ) : isInWishlist(product._id) ? (
                      <motion.div
                        key="filled"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IoIosHeart className="cursor-pointer text-red-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IoIosHeartEmpty className="cursor-pointer text-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className='text-lg font-bold tracking-tight text-gray-800 mb-1 line-clamp-1 group-hover:text-[#B88E2F] transition-colors'>
                {product.name}
              </h3>
              <p className='text-sm tracking-tight text-gray-500 mb-3 line-clamp-2'>
                {product.description}
              </p>
              <div className='flex items-center gap-2'>
                <span className='text-xl font-bold text-gray-800'>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className='text-sm line-through text-gray-400'>
                  ₹{product.oldPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile - Two Horizontal Scroll Rows with Arrows */}
      <div className="lg:hidden space-y-8">
        {/* First Row */}
        <div className="relative">
          {showLeftArrow1 && (
            <button
              onClick={() => scroll(scrollRef1, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#B88E2F] hover:text-white transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <motion.div
            ref={scrollRef1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            onScroll={() => handleScroll(scrollRef1, setShowLeftArrow1, setShowRightArrow1)}
            className="overflow-x-auto  scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-4 pb-2">
              {products.slice(0, midPoint).map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  onClick={() => showProduct(product._id)}
                  className="flex-shrink-0 lg:w-72 w-64 group border cursor-pointer bg-white rounded-2xl overflow-hidden active:scale-95 transition-all duration-300"
                >
                  <div className='relative overflow-hidden'>
                    {/* Image */}
                    <div className='relative h-64 overflow-hidden bg-gray-100'>
                      <img
                        src={product.img}
                        className='w-full h-full border-b border-gray-200 object-cover'
                        alt={product.name}
                      />
                    </div>

                    {/* Heart Icon */}
                    {user && (
                      <motion.div
                        className="absolute top-4 right-4 z-20 text-2xl bg-white/90 backdrop-blur-sm p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {loadingProducts.includes(product._id) ? (
                            <motion.div
                              key="loading"
                              initial={{ scale: 0.8, rotate: 0 }}
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                              exit={{ scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                            >
                              <IoIosHeart className="cursor-pointer text-red-500" />
                            </motion.div>
                          ) : isInWishlist(product._id) ? (
                            <motion.div
                              key="filled"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <IoIosHeart className="cursor-pointer text-red-500" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="empty"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 15 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <IoIosHeartEmpty className="cursor-pointer text-red-500" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-3 lg:p-5">
                    <h3 className='text-lg font-bold tracking-tight text-gray-800 mb-2 line-clamp-1'>
                      {product.name}
                    </h3>
                    <p className='text-sm text-gray-500 tracking-tight mb-3 line-clamp-2'>
                      {product.description}
                    </p>
                    <div className='flex items-center gap-2'>
                      <span className='text-xl font-bold text-gray-800'>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className='text-sm line-through text-gray-400'>
                        ₹{product.oldPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {showRightArrow1 && (
            <button
              onClick={() => scroll(scrollRef1, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#B88E2F] hover:text-white transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Second Row */}
        {products.slice(midPoint).length > 0 && (
          <div className="relative">
            {showLeftArrow2 && (
              <button
                onClick={() => scroll(scrollRef2, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#B88E2F] hover:text-white transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <motion.div
              ref={scrollRef2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
              onScroll={() => handleScroll(scrollRef2, setShowLeftArrow2, setShowRightArrow2)}
              className="overflow-x-auto  scrollbar-hide scroll-smooth"
            >
              <div className="flex gap-4 pb-2">
                {products.slice(midPoint).map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    onClick={() => showProduct(product._id)}
                    className="flex-shrink-0 lg:w-72 w-64 group border cursor-pointer bg-white rounded-2xl overflow-hidden active:scale-95 transition-all duration-300"
                  >
                    <div className='relative overflow-hidden'>
                      {/* Image */}
                      <div className='relative h-64 overflow-hidden bg-gray-100'>
                        <img
                          src={product.img}
                          className='w-full h-full border-b border-gray-200 object-cover'
                          alt={product.name}
                        />
                      </div>

                      {/* Heart Icon */}
                      {user && (
                        <motion.div
                          className="absolute top-4 right-4 z-20 text-2xl bg-white/90 backdrop-blur-sm p-2 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {loadingProducts.includes(product._id) ? (
                              <motion.div
                                key="loading"
                                initial={{ scale: 0.8, rotate: 0 }}
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                exit={{ scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                              >
                                <IoIosHeart className="cursor-pointer text-red-500" />
                              </motion.div>
                            ) : isInWishlist(product._id) ? (
                              <motion.div
                                key="filled"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <IoIosHeart className="cursor-pointer text-red-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="empty"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <IoIosHeartEmpty className="cursor-pointer text-red-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-3 lg:p-5">
                      <h3 className='text-lg font-bold tracking-tight text-gray-800 mb-2 line-clamp-1'>
                        {product.name}
                      </h3>
                      <p className='text-sm text-gray-500 tracking-tight mb-3 line-clamp-2'>
                        {product.description}
                      </p>
                      <div className='flex items-center gap-2'>
                        <span className='text-xl font-bold text-gray-800'>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className='text-sm line-through text-gray-400'>
                          ₹{product.oldPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {showRightArrow2 && (
              <button
                onClick={() => scroll(scrollRef2, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#B88E2F] hover:text-white transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.div>
  );
};

export default memo(CategorySection);