import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Eye } from 'lucide-react';

export default function Product() {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(true);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [showLeftArrow1, setShowLeftArrow1] = useState(false);
  const [showRightArrow1, setShowRightArrow1] = useState(true);
  const [showLeftArrow2, setShowLeftArrow2] = useState(false);
  const [showRightArrow2, setShowRightArrow2] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://urbanfest.onrender.com/products', { withCredentials: true })
      .then((response) => {
        const products = response.data;
        const randomNum = Math.floor(Math.random() * 32);
        setProduct(products.slice(randomNum, randomNum + 8));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const ShowProduct = (id) => {
    navigate(`/products/show/${id}`);
  };

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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };


  return (
    <div className="lg:px-20 bg-gradient-to-b from-white to-gray-50 px-6 py-24">
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12 lg:mb-16"
      >
        <h1 className='lg:text-4xl text-3xl text-gray-700 tracking-tighter font-extrabold'>Our top <span className='text-[#B88E2F]'>Collections. </span></h1>
        <p className='text-gray-600 mt-3 text-sm tracking-tight lg:text-base'>Discover our handpicked selection of premium furniture.</p>
      </motion.div>

      {loading ? (
        <>
          {/* Desktop Skeleton */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="bg-gray-200 animate-pulse h-64 w-full"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Skeleton */}
          <div className="lg:hidden space-y-8">
            {[1, 2].map((row) => (
              <div key={row} className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden">
                      <div className="bg-gray-200 animate-pulse h-64 w-full"></div>
                      <div className="p-5 space-y-3">
                        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Desktop Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:grid lg:grid-cols-4 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
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
                    
                    {/* Hover Overlay */}
                    <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
                      <button className='bg-white text-gray-800 p-3 rounded-full hover:bg-[#B88E2F] hover:text-white transition-colors duration-300'>
                        <Eye size={20} />
                      </button>
                      
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

          {/* Mobile - Horizontal Scroll with Navigation */}
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
                className="overflow-x-auto scrollbar-hide scroll-smooth"
              >
                <div className="flex gap-4 pb-2 ">
                  {products.slice(0, 4).map((product, index) => (
                    <motion.div
                      key={index}
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
                            className='w-full h-full border-b  border-gray-200 object-cover' 
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
            <div className="relative">
              {showLeftArrow2 && (
                <button
                  onClick={() => scroll(scrollRef2, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full  hover:bg-[#B88E2F] hover:text-white transition-all duration-300"
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
                className="overflow-x-auto scrollbar-hide scroll-smooth"
              >
                <div className="flex gap-4 pb-2 px-1">
                  {products.slice(4, 8).map((product, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      onClick={() => ShowProduct(product._id)}
                      className="flex-shrink-0 border lg:w-72 w-64 group cursor-pointer bg-white rounded-2xl overflow-hidden active:scale-95 transition-all duration-300"
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
                            className='w-full h-full object-cover border-b border-gray-200' 
                            alt={product.name} 
                          />
                        </div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="lg:p-5 p-3">
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
          </div>

          {/* Scrollbar Hide CSS */}
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
        </>
      )}
    </div>
  );
}