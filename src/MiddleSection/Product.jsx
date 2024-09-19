import '../assets/fonts.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DummySection from '../DummySections/DummySection.jsx';

export default function Product() {

  const [products, setProduct] = useState([]);
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://urbanfest.onrender.com/products', { withCredentials: true }).then((response) => {
      const products = response.data;
      const randomNum = Math.floor(Math.random() * 32);
      setProduct(products.slice(randomNum, randomNum + 8));
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const ShowProduct = (id) => {
    navigate(`/products/show/${id}`);
  }



  return (
    <div className="lg:mx-20 animate-slideUp mx-10 my-0 mb-20 font-inter">
      <div className="header-section text-center mb-20">
        <h1 className='text-3xl text-gray-700 font-extrabold'>Our Products.</h1>
      </div>
      {loading ? <DummySection /> :

        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">

          {products.map((product, index) => (
            <div onClick={() => ShowProduct(product._id)} className="flex justify-center cursor-pointer lg:mt-0 mt-5 transition-transform transform hover:scale-105 duration-500" key={index}>
              <div className='bg-gray-100 h-96 rounded-xl'>
                <img src={product.img} className='rounded-t-xl h-[70%] w-full' alt={product.name} />
                <div className="card-text p-4">
                  <p className='text-xl text-gray-700 font-semibold tracking-tighter mb-1'>{product.name}</p>
                  <p className='text-sm text-gray-500 mb-1'>{product.description.substring(0, 25)}...</p>
                  <p className='text-lg font-bold mb-1 text-gray-700 tracking-tighter'>₹ {product.price.toLocaleString('en-IN')} &nbsp;
                    <span className='line-through text-base text-gray-500 tracking-tighter'>₹ {product.oldPrice.toLocaleString('en-IN')}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      }
    </div>
  );
}
