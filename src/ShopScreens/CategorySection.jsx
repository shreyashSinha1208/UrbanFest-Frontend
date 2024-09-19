import axios from 'axios';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import DummySection from '../DummySections/DummySection';
import { useState, useEffect } from 'react';

const CategorySection = ({ category, products, showProduct, wishlist, user, token, setWishlist }) => {


  const [loading, setIsLoading] = useState(true);
  const toggleWishlist = async (product) => {
    const existingProduct = wishlist.find(wishprod => wishprod.name === product.name);

    if (existingProduct) {
      // Product is in the wishlist, remove it
      setWishlist(prevWishlist => prevWishlist.filter(wishprod => wishprod.name !== product.name));

      if (existingProduct._id) {
        try {
          await axios.delete(`https://urbanfest.onrender.com/wishlist/${existingProduct._id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
        } catch (error) {
          setWishlist(prevWishlist => [...prevWishlist, existingProduct]);
          console.error('Error removing from wishlist:', error);
        }
      } else {
        console.error('Wishlist item ID is undefined.');
      }
    } else {
      // Product is not in the wishlist, add it
      try {
        const response = await axios.post('https://urbanfest.onrender.com/wishlist', {
          name: product.name,
          img: product.img,
          price: product.price,
          description: product.description,
          oldPrice: product.oldPrice,
          rating: product.rating,
          itemid: product._id
        }, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });

        const wishlistId = response.data._id;
        setWishlist(prevWishlist => [...prevWishlist, { ...product, wishlistId }]);
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    }
  };

  return (
    <div className="mb-16">
      <h2 className="text-3xl tracking-tighter text-gray-600 font-bold mb-10">
        {category.substring(0, 1).toUpperCase() + category.substring(1)}
      </h2>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
        {products.map(product => (
          <div
            onClick={() => showProduct(product._id)}
            className="flex justify-center cursor-pointer lg:mt-0 mt-5 transition-transform transform hover:scale-105 duration-500 relative"
            key={product._id}
          >
            <div className="bg-gray-100 h-96 rounded-xl">
              <img
                src={product.img}
                className="rounded-t-xl h-[70%] w-full"
                alt={product.name}
              />
              <div className="card-text p-4">
                <p className="text-xl text-gray-700 font-semibold tracking-tighter mb-1">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {product.description.substring(0, 25)}...
                </p>
                <p className="text-lg font-bold mb-1 text-gray-700 tracking-tighter">
                  ₹ {product.price.toLocaleString('en-IN')} &nbsp;
                  <span className="line-through text-base text-gray-500 tracking-tighter">
                    ₹ {product.oldPrice.toLocaleString('en-IN')}
                  </span>
                </p>
              </div>
            </div>
            {user && (
              <div
                className="absolute top-3 right-3 z-50 text-2xl text-red-500"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the showProduct function
                  toggleWishlist(product);
                }}
              >
                u
                {wishlist.some(wishprod => wishprod.name === product.name) ? (
                  <IoIosHeart className="cursor-pointer transition-transform transform scale-110 hover:scale-150" />
                ) : (
                  <IoIosHeartEmpty className="cursor-pointer transition-transform transform scale-110 hover:scale-150" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
