
import { FaTrash } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EmptyCart from '../assets/EmptyCart.png';
import CartTotal from './CartTotal';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


export default function CartScreen() {
          // Initialize state as an empty array
          const navigate = useNavigate();
          const [cartItems, setCartItems] = useState([]);
          const [price, setPrice] = useState(0);
          const [loading, setLoading] = useState(true);
          const { user, logout } = useAuth();

          const calculateTotalPrice = (items) => {
                    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    setPrice(total);
          };

          useEffect(() => {
                    if (!user) {
                              navigate('/login', { state: { message: "Please login to access cart" } });
                              return;
                    }
                    axios.get(`https://urbanfest.onrender.com/cart`,
                              {
                                        withCredentials: true,
                                        headers: {
                                                  Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                                        }
                              }
                    )
                              .then((response) => {
                                        setCartItems(response.data);
                                        calculateTotalPrice(response.data);
                              })
                              .catch((error) => {
                                        console.log(error);
                              })
                              .finally(() => {
                                        // Set a timeout of 500ms before stopping the loader
                                        setTimeout(() => {
                                                  setLoading(false);
                                        }, 500);
                              });
          }, []);

          const handledeleteItem = async (id) => {
                    setLoading(true); // Start loading when deleting an item
                    await axios.delete(`https://urbanfest.onrender.com/cart/${id}`,
                              { withCredentials: true, }
                    )
                              .then((response) => {
                                        setCartItems(response.data);
                                        window.location.href = `/cart`;
                              })
                              .catch((error) => {
                                        console.log(error);
                              })
                              .finally(() => {
                                        setTimeout(() => {
                                                  setLoading(false);
                                        }, 500);
                              });
          };

          return (
                    <div>
                              {loading ? (
                                        <LoadingScreen />
                              ) : (
                                        <div className="lg:flex justify-between lg:gap-10 mt-12 mb-20 mx-5 lg:mx-20 font-inter">
                                                  <div className="product-desc w-full lg:w-8/12">
                                                            <div className="lg:flex hidden flex-col items-center justify-between">
                                                                      <div className="lg:flex w-full items-center rounded-xl border-2 border-gray-300 justify-between bg-[#F9F1E7] mb-5 py-4 px-3">
                                                                                <div className='flex items-center w-[37%]'>
                                                                                          <p className="font-semibold  text-black">Item</p>
                                                                                </div>
                                                                                <div>
                                                                                          <p className="font-semibold text-black">Price(₹)</p>
                                                                                </div>
                                                                                <div>
                                                                                          <p className="font-semibold text-black">Color</p>
                                                                                </div>
                                                                                <div >
                                                                                          <div className="quantity">
                                                                                                    <p className="font-semibold text-black">Quantity</p>
                                                                                          </div>
                                                                                </div>
                                                                                <div className='w-[15%]'>
                                                                                          <p className="font-semibold text-black">SubTotal</p>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                            <div className="mt-2 lg:flex flex-col items-center justify-between cursor-pointer">
                                                                      {cartItems.length > 0 ? (
                                                                                cartItems.map((item, index) => (
                                                                                          <div
                                                                                                    key={index}
                                                                                                    className="flex flex-col lg:flex-row w-full lg:items-center justify-between mb-5 py-2 lg:py-4 px-3 border-2 rounded-2xl"
                                                                                          >
                                                                                                    <div className="flex lg:items-center w-full lg:w-[35%] mb-4 lg:mb-0">
                                                                                                              <img
                                                                                                                        className="h-24 w-24 lg:h-32 lg:w-32 rounded-xl"
                                                                                                                        src={item.img}
                                                                                                                        alt="product-image"
                                                                                                              />
                                                                                                              <span>&nbsp;&nbsp;&nbsp;</span>
                                                                                                              <div className="description">
                                                                                                                        <p className="font-medium text-gray-400 lg:mb-0">
                                                                                                                                  {item.name} <span>[{item.size}]</span></p>
                                                                                                                        <div className="flex  mt-5">
                                                                                                                                  <div> <span className='lg:hidden block font-semibold text-gray-400'>₹ {(parseInt(item.price)).toLocaleString()}
                                                                                                                                            &nbsp;&nbsp;&nbsp;  </span></div>
                                                                                                                                  <div className=" rounded-full lg:hidden inline-block cursor-pointer h-5 w-5 lg:mx-0"
                                                                                                                                            style={{ backgroundColor: item.color }}
                                                                                                                                  ></div>
                                                                                                                        </div>



                                                                                                              </div>



                                                                                                    </div>

                                                                                                    <div className="w-full lg:w-[10%] mb-4 lg:block hidden lg:mb-0 text-center lg:text-left">
                                                                                                              <p className="font-semibold text-gray-400 tracking-tight">
                                                                                                                        ₹ {(parseInt(item.price)).toLocaleString()}
                                                                                                              </p>
                                                                                                    </div>

                                                                                                    <div className="mb-4 lg:block hidden lg:mb-0">
                                                                                                              <div
                                                                                                                        className="rounded-full cursor-pointer h-5 w-5 mx-auto lg:mx-0"
                                                                                                                        style={{ backgroundColor: item.color }}
                                                                                                              ></div>
                                                                                                    </div>

                                                                                                    <div className="w-full flex justify-start items-center text-center lg:w-auto lg:mb-0 lg:text-left">
                                                                                                              <div className="w-4/12 lg:w-full quantity border-[2px] lg:h-full h-[30%] px-3 py-1 rounded-lg border-gray-400">
                                                                                                                        <p className="font-medium text-gray-800">{item.quantity}</p>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <span className='lg:hidden inline text-xl font-bold ml-12 text-black'>
                                                                                                                                  ₹ {(item.price * item.quantity).toLocaleString()}&nbsp;&nbsp;
                                                                                                                                  <span className="text-[#B88E2F] cursor-pointer">
                                                                                                                                            <FaTrash
                                                                                                                                                      onClick={() => handledeleteItem(item._id)}
                                                                                                                                                      className="inline-block"
                                                                                                                                            />
                                                                                                                                  </span>
                                                                                                                        </span>
                                                                                                              </div>
                                                                                                    </div>

                                                                                                    <div className="lg:block hidden lg:w-[15%] text-center lg:text-left">
                                                                                                              <p className="font-medium text-black tracking-tight">
                                                                                                                        ₹ {(item.price * item.quantity).toLocaleString()}&nbsp;&nbsp;
                                                                                                                        <span className="text-[#B88E2F] cursor-pointer">
                                                                                                                                  <FaTrash
                                                                                                                                            onClick={() => handledeleteItem(item._id)}
                                                                                                                                            className="inline-block"
                                                                                                                                  />
                                                                                                                        </span>
                                                                                                              </p>
                                                                                                    </div>
                                                                                          </div>
                                                                                ))
                                                                      ) : (
                                                                                <div className="flex items-center mt-10 justify-center h-full">
                                                                                          <img
                                                                                                    src={EmptyCart}
                                                                                                    className="h-24 w-24 animate-ping object-contain"
                                                                                                    alt="EmptyCart-gif"
                                                                                          />
                                                                                </div>
                                                                      )}
                                                            </div>

                                                  </div>
                                                  <div className='lg:w-4/12 w-full'>
                                                            <CartTotal totalPrice={price} />
                                                  </div>
                                        </div>
                              )}
                    </div>
          );
}
