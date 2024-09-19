import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faStar } from '@fortawesome/free-solid-svg-icons';
import ShowNavbar from './ShowNavbar';
import { useNavigate } from 'react-router-dom';
import RelatedProducts from './RelatedProducts';
import LogoImage from '../assets/Logo.png';
import StarRating from './StarRating';
import Review from './Review';


export default function Show() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedSize, setSelectedSize] = useState('L');
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('authToken');

  const { productId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`https://urbanfest.onrender.com/products/show/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
      }, withCredentials: true
    }).then((response) => {
      const product = response.data;
      setProduct(product);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }).catch((error) => {
      console.log(error);
    });
  }, [productId]);



  const array = [1, 2, 3, 4, 5];

  const colors = [
    { color: '#816DFA' },
    { color: 'black' },
    { color: '#B88E2F' }
  ];

  const sizes = [
    { size: 'L' },
    { size: 'XL' },
    { size: 'XS' }
  ]



  const increaseCount = () => {
    setQuantity(quantity + 1);
  }

  const decreaseCount = () => {
    quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1);
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  }

  const addToCart = async () => {
    navigate("/cart");
    try {
      const data = {
        name: product.name,
        img: product.img,
        price: product.price,
        oldPrice: product.oldPrice,
        category: product.category,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
      };

      const response = await axios.post('https://urbanfest.onrender.com/cart', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        }, withCredentials: true
      });
      console.log("Added item to cart");

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="font-inter ">
      <ShowNavbar productName={product.name} id="top-section" />
      {isLoading ? (
        <div className="mt-40 flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-28 h-28 border-8 text-[#B88E2F] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#B88E2F] rounded-full">
            <img src={LogoImage} className='w-12 h-8 animate-ping' alt="Logo-Image" />
          </div>
        </div>
      ) : (
        <>
          {product && (
            <div className="show-screen lg:grid lg:grid-cols-2 lg:mx-20 mx-10 lg:mt-12 mt-10 lg:mb-0 mb-10">
              <div className="lg:w-10/12 lg:mb-0 mb-5 w-full lg:h-[35rem] h-[20rem]">
                <img className="bg-[#F9F1E7] rounded-2xl h-full lg:h-3/4" src={product.img} alt="picture-jpg" />
              </div>
              <div>
                <div className="items-start">
                  <h1 className="text-3xl font-semibold tracking-tighter">{product.name}</h1>
                  <h2 className="mt-2 text-xl tracking-tighter font-bold text-gray-400">₹ {parseInt(product.price).toLocaleString('en-IN')}
                    &nbsp; &nbsp;
                    <span className="text-gray-400 tracking-tighter line-through">₹ {parseInt(product.oldPrice).toLocaleString('en-IN')}</span>
                    &nbsp; &nbsp;
                    <span className='text-green-600 lg:inline block lg:mt-0 mt-2 tracking-wide font-bold text-sm'><FontAwesomeIcon icon={faArrowDown} /> {(((parseInt(product.oldPrice) - parseInt(product.price))) / (parseInt(product.oldPrice)) * 100).toFixed(2)}%</span>
                  </h2>
                  <div className="lg:flex justify-between align-middle mt-2 lg:w-7/12">
                    <div className="review-stars">
                      <StarRating rating={product.rating} />
                    </div>
                    <div className="border-[1px] mt-2 lg:mt-0 border-l-[#D9D9D9]"></div>
                    <div className="reviews-num items-center mt-2 lg:mt-0">
                      <p className="text-md  text-gray-400">23 Customer Review</p>
                    </div>

                  </div>
                  <div className="mt-4 lg:w-10/12">
                    <p className=" text-sm">{product.description}
                    </p>
                  </div>
                  <div className="size mt-4">
                    <p className="text-gray-400 text-sm">Size</p>
                    <div className="flex lg:w-3/12 w-6/12 mt-4 justify-between">
                      {sizes.map((sizeObj, index) => (
                        <div className={`rounded-md cursor-pointer py-1 
                                                                                
                   ${selectedSize == sizeObj.size ? 'bg-[#B88E2F] text-white' : 'bg-[#F9F1E7] text-black'}
                    ${sizeObj.size == 'L' ? 'px-3' : 'px-2'}
                    `}
                          key={index} onClick={() => handleSizeSelect(sizeObj.size)}>
                          {sizeObj.size}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="color mt-4">
                    <p className="text-gray-400 text-sm">Color</p>
                    <div className="flex lg:w-2/12 w-4/12  mt-4 justify-between">
                      {colors.map((colorObj, index) => (
                        <div
                          key={index}
                          className={`rounded-full cursor-pointer h-5 w-5 ${selectedColor === colorObj.color ? 'border-2 border-gray-500' : ''}`}
                          style={{ backgroundColor: colorObj.color }}
                          onClick={() => handleColorSelect(colorObj.color)}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="final-div mt-8">
                    <div className="flex lg:w-6/12 w-full lg:justify-around justify-between">
                      <div className=" rounded-full cursor-pointer">
                        <div className="py-3 border-2 hover:border-black border-gray-300 rounded-lg">
                          <div className="flex w-32 justify-around">
                            <div><button onClick={decreaseCount}>-</button></div>
                            <div><button>{quantity}</button></div>
                            <div><button onClick={increaseCount}>+</button></div>
                          </div>

                        </div>
                      </div>
                      <div className=" rounded-lg flex items-center justify-center cursor-pointer border-2 hover:border-black border-gray-300 py-3 w-32">
                        <button type="submit" onClick={addToCart}>Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Review product={product} />
          <RelatedProducts category={product.category} />
        </>
      )}
    </div>
  )
}