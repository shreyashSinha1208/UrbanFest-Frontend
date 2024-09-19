import React from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function RelatedProducts({ category }) {

  const [products, setProduct] = useState([]);
  const token = localStorage.getItem('authToken');
  // console.log(category);

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    axios.get(`https://urbanfest.onrender.com/products/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
      }, withCredentials: true
    }).then((response) => {
      const products = response.data;
      const randomNum = Math.floor(Math.random() * 4);
      setProduct(products.slice(randomNum, randomNum + 4));
    }).catch((error) => {
      console.log(error);
    });
  }, [category, productId]);

  const ShowProduct = (id) => {
    window.location.href = `/products/show/${id}`;
  }

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,   // Show one slide at a time on small screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Medium screen size and above
        settings: {
          slidesToShow: 4, // Show 4 items in grid layout
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, // Small screens (e.g., tablets)
        settings: {
          slidesToShow: 2, // Show 2 items in grid layout on tablets
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 1, // Show 1 item in carousel layout on mobiles
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ],
  };

  return (
    <div>
      <div className="lg:mx-20 mx-10 my-0 font-inter">
        <div className="header-section lg:mb-20 mb-10">
          <h1 className='text-3xl text-gray-700 tracking-tighter font-extrabold lg:hidden block text-center'>Related Products.</h1>
          <h1 className='text-3xl text-black font-semibold lg:block hidden tracking-tighter'>Similar products you might be interested.</h1>
        </div>
        {/* Grid layout for large screens */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <div className="flex justify-center cursor-pointer lg:mt-0 mt-5 transition-transform transform hover:scale-105 duration-500" key={index}>
              <div onClick={() => ShowProduct(product._id)} className='bg-gray-100 rounded-xl h-96'>
                <img src={product.img} className='rounded-t-xl h-[70%] w-full' alt={product.name} />
                <div className="card-text p-4">
                  <p className='text-xl text-gray-700 font-semibold mb-1 tracking-tighter'>{product.name}</p>
                  <p className='text-sm text-gray-500 mb-1'>{product.description.substring(0, 25)}...</p>
                  <p className='text-lg font-bold mb-1 text-gray-700 tracking-tighter'>₹ {product.price.toLocaleString('en-IN')} &nbsp;
                    <span className='line-through text-base text-gray-500 tracking-tighter'>₹ {product.oldPrice.toLocaleString('en-IN')}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Carousel layout for small screens */}
        <div className="lg:hidden">
          <Slider {...settings}>
            {products.map((product, index) => (
              <div className="flex justify-center cursor-pointer transition-transform transform hover:scale-105 duration-500" key={index}>
                <div onClick={() => ShowProduct(product._id)} className='bg-gray-100 rounded-xl h-96'>
                  <img src={product.img} className='rounded-t-xl h-[70%] w-full' alt={product.name} />
                  <div className="card-text p-4">
                    <p className='text-xl text-gray-700 font-semibold mb-1'>{product.name}</p>
                    <p className='text-sm text-gray-500 mb-1'>{product.description.substring(0, 25)}...</p>
                    <p className='text-lg font-bold mb-1 text-gray-700'>₹ {product.price} &nbsp;
                      <span className='line-through text-base text-gray-500'>₹ {product.oldPrice}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="button flex mt-20 mb-20 justify-center">
          <Link to="/shop">
            <button type="submit" className='bg-white h-12 w-36  border-2 border-[#B88E2F]  text-[#B88E2F] hover:text-white hover:bg-[#B88E2F] text-[12px] font-semibold'>SHOW MORE</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
