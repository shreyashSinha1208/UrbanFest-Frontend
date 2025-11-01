import { useEffect, useState } from 'react';
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion';

export default function Review({ product }) {
  const [review, setReview] = useState([]);
  const [averageRating, setAverageRating] = useState(product.rating);
  const [reviewsToDisplay, setReviewsToDisplay] = useState(3);

  useEffect(() => {
    if (product.review) {
      setReview(product.review);
      const totalRating = product.rating + product.review.reduce((acc, sum) => acc + sum.rating, 0);
      setAverageRating(totalRating / (product.review.length + 1));
    }
  }, [product]);

  function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<IoIosStar className="text-yellow-500" key={i} />);
      } else if (rating >= i - 0.5) {
        stars.push(<IoIosStarHalf className="text-yellow-500" key={i} />);
      } else {
        stars.push(<IoIosStarOutline className="text-gray-300" key={i} />);
      }
    }
    return stars;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const reviewCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className='lg:px-20 bg-white px-5 '>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="review-section rounded-2xl border"
      >
        <div className="review-section">
          <div className="review-header pb-0 lg:px-8 px-4 pt-4 lg:pt-6 rounded-t-md">
            <h1 className="text-2xl tracking-tighter font-semibold">
              Ratings & Reviews &nbsp;
              <span className='lg:inline inline-block text-sm'>
                 {review.length} ratings
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rating flex items-center lg:pl-8 pl-4 my-3"
          >
            <h1 className="text-4xl font-bold text-yellow-500 flex items-center gap-2">
              {averageRating?.toFixed(1)}
              <span className="flex">{renderStars(averageRating)}</span>
            </h1>
          </motion.div>

          {review.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 lg:px-8 mb-4"
            >
              <AnimatePresence mode="popLayout">
                {review.slice(0, reviewsToDisplay).map((rev) => (
                  <motion.div
                    key={rev._id}
                    variants={reviewCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{ scale: 1.02 }}
                    className="testimonial-card border py-4 px-5 cursor-pointer selection:text-white selection:bg-[#B88E2F] rounded-xl"
                  >
                    <div className="card-person mb-4">
                      <div className="person-rating">
                        <div className="flex justify-between items-start">
                          <div className="name">
                            <h1 className="mb-1 tracking-tighter text-lg font-semibold">
                              {rev.author?.username} <MdVerified className='inline text-blue-500' />
                            </h1>
                          </div>
                        </div>
                        <div className='text-sm flex'>{renderStars(rev.rating)}</div>
                      </div>
                    </div>
                    <div className="card-text">
                      <p className="text-[15px] text-gray-700 tracking-tighter font-normal">
                        {rev.reviewText}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {review.length > reviewsToDisplay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="show-more mb-4"
            >
              <motion.p
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setReviewsToDisplay(reviewsToDisplay + 3)}
                className='text-lg font-semibold text-center tracking-tighter cursor-pointer text-[#B88E2F] hover:text-[#a07a28]'
              >
                Show More...
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}