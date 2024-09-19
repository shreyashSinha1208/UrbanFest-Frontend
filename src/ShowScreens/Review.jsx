import { useEffect, useState } from 'react';
import { IoIosStar, IoIosStarOutline, IoIosStarHalf, } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useAuth } from '../AuthContext';
import { MdVerified } from "react-icons/md";
import axios from 'axios';

export default function Review({ product }) {

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState([]);
  const [averageRating, setAverageRating] = useState(product.rating);
  const [reviewsToDisplay, setReviewsToDisplay] = useState(3);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, logout } = useAuth();
  const token = localStorage.getItem('authToken');

  console.log('Product reviews:', product.review);
  console.log('Logged in user:', user);


  useEffect(() => {
    setReview(product.review);
    setAverageRating((product.rating + product.review.reduce((acc, sum) => acc + sum.rating, 0)) / (product.review.length + 1));
  });

  const handleReview = async () => {
    if (rating === 0) {
      setErrorMessage("Please give a rating before submitting.");
      setTimeout(() => {
        setErrorMessage("");
      }, 1000)
      return;
    }
    const newReview = { name: user.name, rating: rating, reviewText: reviewText };
    setRating(0);
    setReviewText('');
    setReview([...review, newReview]);
    try {
      const response = await axios.post('https://urbanfest.onrender.com/createReview', {
        productId: product._id,
        rating: rating,
        reviewText: reviewText,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
        withCredentials: true,
      });
      setReview(response);
      window.location.href = `/products/show/${product._id}`
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (reviewId) => {
    console.log(product._id, reviewId);

    try {
      const response = await axios.delete(
        'https://urbanfest.onrender.com/deleteReview',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
          },
          data: { // Axios requires `data` field for DELETE requests
            productId: product._id,
            reviewId: reviewId
          },
          withCredentials: true,
        },
      );
      setReview(response);
      window.location.href = `/products/show/${product._id}`;
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };


  function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<IoIosStar className="text-yellow-500" key={i} onClick={() => setRating(i)} />);
      } else if (rating >= i - 0.5) {
        stars.push(<IoIosStarHalf className="text-yellow-500" key={i} onClick={() => setRating(i)} />);
      } else {
        stars.push(<IoIosStarOutline className="text-gray-300" key={i} onClick={() => setRating(i)} />);
      }
    }
    return stars;
  }

  // console.log(user ? user : false);


  let hasAlreadyWritten = false;
  if (user) {
    hasAlreadyWritten = review.some((review) => review.author?._id === user._id);

  }

  return (
    <div>
      {errorMessage && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-[#B88E2F] text-white px-4 py-2 font-inter z-50">
          {errorMessage}
        </div>
      )}
      <div className="review-section mb-40 lg:mx-20 mx-5 rounded-md border">
        <div className="review-section mb-5">
          <div className="review-header pb-0 px-8 pt-8 rounded-t-md">
            <h1 className="text-2xl tracking-tighter font-semibold">Ratings & Reviews &nbsp;<span className='lg:inline inline-block text-sm'>[Based on {review.length} ratings]</span></h1>

          </div>
          <div className="rating flex items-center pl-8 my-3">
            <h1 className="text-4xl font-bold text-yellow-500 flex">{averageRating.toFixed(1)} &nbsp;{renderStars(averageRating)}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-8 mb-4 bg-white">
            {review.slice(0, reviewsToDisplay).map((review, index) => (
              <div
                key={index}
                className="testimonial-card border py-4 px-5 transition-transform cursor-pointer transform hover:scale-105 selection:text-white selection:bg-[#B88E2F] duration-700 bg-gray-50 rounded-md"
              >
                <div className="card-person mb-4">
                  <div className="person-rating">
                    <div className="flex justify-between">
                      <div className="name">
                        <h1 className="mb-1 tracking-tighter text-lg font-semibold">{review.author?.username} <MdVerified className='inline' /></h1>
                      </div>
                      {review.author?._id === user?._id &&
                        <div className="trash">
                          <FaTrash className='cursor-pointer inline' onClick={() => handleDelete(review._id)} />
                        </div>
                      }

                    </div>
                    <h1 className='text-sm flex'>{renderStars(review.rating)}</h1>
                  </div>
                </div>
                <div className="card-text">
                  <p className="text-[15px] text-gray-700 tracking-tighter font-normal">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            ))}

          </div>
          {review.length > reviewsToDisplay &&
            <div className="show-more">
              <p onClick={() => setReviewsToDisplay(reviewsToDisplay + 3)} className='text-lg font-semibold text-center tracking-tighter cursor-pointer'>Show More...</p>
            </div>
          }


          {(!hasAlreadyWritten && user) &&
            <div className="review-input py-0 px-8">
              <label className='text-lg tracking-tighter font-semibold text-gray-900' htmlFor='rating'>How much would you rate this product?</label>
              <div className="flex text-xl my-2">{renderStars(rating)}</div>
              <label htmlFor="reviewText" className="text-lg tracking-tighter font-semibold text-gray-900">Add your Review &nbsp;: </label>
              <textarea id="reviewText" value={reviewText} rows="4" onChange={(e) => setReviewText(e.target.value)} className="block mt-2 p-2.5 w-full text-md tracking-tighter text-gray-900 bg-gray-50 rounded-lg border" placeholder={review.length > 0 ? `Share your experience with the product...` : `Be the first to Review...`}></textarea>
              <button type="submit" onClick={handleReview} className="my-4 text-white bg-[#B88E2F] hover:bg-[#B88E2F]  font-medium rounded-md text-sm px-10 py-2.5 me-2 mb-2">Submit</button>
            </div>}

        </div>
      </div>
    </div>

  );
}
