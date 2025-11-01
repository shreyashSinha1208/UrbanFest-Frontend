import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';

export default function RatingPopup({ ratingPopup, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (rating === 0) {
      setErrorMessage("Please give a rating before submitting.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(rating, reviewText);
      handleClose();
    } catch (error) {
      setErrorMessage("Failed to submit rating. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setReviewText('');
    setHoverRating(0);
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {ratingPopup.isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Rate Product</h3>
                  <p className="text-sm text-gray-600">Share your experience</p>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {/* Product Info */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                {ratingPopup.product?.productId.img ? (
                  <img
                    src={ratingPopup.product.productId.img}
                    alt={ratingPopup.product.productId.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-gray-200"
                    style={{ backgroundColor: ratingPopup.product?.color || '#e5e7eb' }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {ratingPopup.product?.productId.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Size: {ratingPopup.product?.size}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rating Stars */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  How would you rate this product? *
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Star
                        className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-2 text-sm font-medium text-gray-700"
                  >
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </motion.p>
                )}
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label htmlFor="reviewText" className="block text-sm font-semibold text-gray-900 mb-2">
                  Write your review (Optional)
                </label>
                <textarea
                  id="reviewText"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent resize-none"
                  placeholder="Share your thoughts about this product..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting || rating === 0}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-[#B88E2F] rounded-lg hover:bg-[#a07a28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}