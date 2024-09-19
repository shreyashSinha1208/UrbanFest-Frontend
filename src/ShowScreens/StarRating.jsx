import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
  // Array to represent each star
  const stars = Array(5).fill(0);

  return (
    <div className="rating text-md">
      {stars.map((_, index) => {
        // Calculate the star number (1-based)
        const starNumber = index + 1;

        // Determine if the star should be full, partially filled, or empty
        let fillPercentage = 0;
        if (starNumber <= Math.floor(rating)) {
          fillPercentage = 100; // Full star
        } else if (starNumber === Math.ceil(rating)) {
          fillPercentage = (rating % 1) * 100; // Partially filled star
        }

        return (
          <div key={index} className="relative inline-block">
            {/* Background star (gray) */}
            <FontAwesomeIcon className="text-gray-300 mr-1" icon={faStar} />
            {/* Foreground star (yellow) with dynamic width */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
