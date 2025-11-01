import { motion } from 'framer-motion';
import quality from '../assets/Trophy.png';
import warranty from '../assets/guarantee.png';
import shipping from '../assets/shipping.png';
import customerSupport from '../assets/customer-support.png';

export default function CartFooter() {
  const features = [
    {
      icon: quality,
      title: 'High Quality',
      description: 'Crafted from top materials',
      alt: 'Quality',
    },
    {
      icon: warranty,
      title: 'Warranty Protection',
      description: 'Over 2 years',
      alt: 'Warranty',
    },
    {
      icon: shipping,
      title: 'Free Shipping',
      description: 'Order over ₹10,000',
      alt: 'Shipping',
    },
    {
      icon: customerSupport,
      title: '24/7 Support',
      description: 'Dedicated support',
      alt: 'Customer Support',

    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className='relative bg-gradient-to-br from-[#FAF3E0] via-[#F9F1E7] to-[#FAF3E0] border-t border-[#B88E2F]/20 overflow-hidden'>
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B88E2F]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B88E2F]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative lg:mx-20 mx-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="relative group cursor-pointer"
          >
            {/* Card Background */}
            <motion.div
              className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl border  transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            />
            
            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

            {/* Content */}
            <div className="relative flex flex-col items-center text-center p-8 lg:p-6">
              {/* Icon Container with Animated Border */}
              <motion.div
                whileHover={{ 
                  rotate: [0, -5, 5, -5, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative mb-6 lg:mb-4"
              >
                {/* Rotating Border Effect */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-[#B88E2F] via-transparent to-[#B88E2F] rounded-2xl opacity-0 group-hover:opacity-30 blur-sm"
                />
                
                <div className="relative w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl  flex items-center justify-center group-hover: transition-all duration-300 border border-[#B88E2F]/10 group-hover:border-[#B88E2F]/30">
                  <motion.img 
                    src={feature.icon} 
                    alt={feature.alt}
                    className="w-10 h-10 object-contain"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="space-y-2">
                <motion.h3 
                  className='text-lg lg:text-xl font-bold text-gray-800 tracking-tight group-hover:text-[#B88E2F] transition-colors duration-300'
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.title}
                </motion.h3>
                <p className='text-sm lg:text-base text-gray-600 leading-relaxed font-medium group-hover:text-gray-700 transition-colors duration-300'>
                  {feature.description}
                </p>
              </div>

              {/* Decorative Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="absolute -top-2 -right-2 w-3 h-3 bg-[#B88E2F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#B88E2F]/40 to-transparent"
      />
    </div>
  );
}