import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartSuggestions() {

  const [allWishlistProducts, setAllWishlistProducts] = useState([]);
  const token = localStorage.getItem('authToken');
  const [showLeftArrow1, setShowLeftArrow1] = useState(false);
  const [showRightArrow1, setShowRightArrow1] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const scrollRef1 = useRef(null);
  const [loading, setLoading] = useState(true);

  // Derive filtered products from all wishlist products
  const cartItemIds = (user?.cartItems || []).map(item => item.productId);
  const products = allWishlistProducts.filter(item => !cartItemIds.includes(item._id));

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

  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('https://urbanfest.onrender.com/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setAllWishlistProducts(response.data); // Store ALL wishlist products
      setLoading(false);
    } catch (error) {
      console.log('Error fetching wishlist:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login', {
        state: { message: 'Please login to view your wishlist' },
        replace: true
      });
      return;
    }
    fetchWishlist();
  }, [user?.cartItems, navigate]);

  const ShowProduct = (id) => {
    navigate(`/products/show/${id}`);
  };

  if (loading || products.length === 0) return null;

  return (
    <div>
      {user.cartItems.length > 0 && (
        <div className="lg:px-20 my-0 lg:py-16 pt-10 pb-5 bg-white">
          <section
            className="flex items-center px-5 gap-4 lg:justify-start justify-center pb-10"
          >
            <div className="h-[2px] w-12 bg-[#B88E2F] hidden lg:block"></div>
            <h2 className="text-3xl md:block hidden tracking-tighter text-gray-800 font-bold">
              You are missing out on these
            </h2>
            <h2 className='text-2xl md:hidden tracking-tighter text-gray-800 font-bold'>
              You missed these
            </h2>
            <div className="h-[2px] lg:flex-1 flex-grow bg-gradient-to-r from-[#B88E2F] to-transparent"></div>

          </section>

          {/* Grid layout for large screens */}
          <motion.div
            key={products.map(p => p._id).join(',')}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="hidden md:grid md:grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => ShowProduct(product._id)}
                className="group cursor-pointer bg-white border rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className='relative overflow-hidden'>
                  {/* Discount Badge */}
                  <div className='absolute top-4 right-4 bg-[#B88E2F] text-white px-3 py-1 rounded-full text-sm font-semibold z-10'>
                    -{calculateDiscount(product.oldPrice, product.price)}%
                  </div>

                  {/* Image */}
                  <div className='relative h-64 overflow-hidden bg-gray-100'>
                    <img
                      src={product.img}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      alt={product.name}
                    />

                    {/* Hover Overlay - optional, remove if not needed */}
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
                      <div className='bg-white text-gray-800 p-3 rounded-full hover:bg-[#B88E2F] hover:text-white transition-colors duration-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </div>
                    </div>
                  </div>
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


          <div className="lg:hidden space-y-8">
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
                key={products.map(p => p._id).join(',')}
                onScroll={() => handleScroll(scrollRef1, setShowLeftArrow1, setShowRightArrow1)}
                className="overflow-x-auto mx-5 scrollbar-hide scroll-smooth"
              >
                <div className="flex gap-4 pb-2">
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      variants={itemVariants}
                      onClick={() => ShowProduct(product._id)}
                      className="flex-shrink-0 lg:w-72 w-64 group border cursor-pointer bg-white rounded-2xl overflow-hidden active:scale-95 transition-all duration-300"
                    >
                      <div className='relative overflow-hidden'>
                        {/* Discount Badge */}
                        <div className='absolute top-4 right-4 bg-[#B88E2F] text-white px-3 py-1 rounded-full text-sm font-semibold z-10'>
                          -{calculateDiscount(product.oldPrice, product.price)}%
                        </div>

                        {/* Image */}
                        <div className='relative h-64 overflow-hidden bg-gray-100'>
                          <img
                            src={product.img}
                            className='w-full h-full border-b border-gray-200 object-cover'
                            alt={product.name}
                          />
                        </div>
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

              {showRightArrow1 && products.length > 2 && (
                <button
                  onClick={() => scroll(scrollRef1, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-[#B88E2F] hover:text-white transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
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

        </div>
      )}
    </div>
  );
}