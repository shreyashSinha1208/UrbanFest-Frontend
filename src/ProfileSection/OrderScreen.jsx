import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useAuth } from '../AuthContext';
import ReactToPrint from 'react-to-print';

export default function OrderScreen() {
          const [orders, setOrders] = useState([]);
          const [loading, setLoading] = useState(true);
          const { user } = useAuth();
          const componentRefs = useRef([]);
          const token = localStorage.getItem('authToken');
          console.log(token);


          useEffect(() => {

                    const loadingTimer = setTimeout(() => {
                              setLoading(false);
                    }, 1000);

                    const fetchOrders = async () => {
                              try {
                                        const response = await axios.get('https://urbanfest.onrender.com/orders',
                                                  { headers: { Authorization: `Bearer ${token}`, }, withCredentials: true });
                                        const sortedOrders = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
                                        console.log(response.data);
                                        setOrders(sortedOrders);
                              } catch (error) {
                                        console.error('Error fetching orders:', error);
                              }
                    };

                    fetchOrders();
          }, []);

          // Helper function to format date
          const formatDate = (date) => {
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return new Date(date).toLocaleDateString(undefined, options);
          };

          // Helper function to calculate delivered by date
          const calculateDeliveredByDate = (orderDate) => {
                    const date = new Date(orderDate);
                    date.setDate(date.getDate() + 5);
                    return formatDate(date);
          };

          if (loading) {
                    return <LoadingScreen />;
          }

          return (
                    <div className="lg:flex lg:justify-between mb-5 lg:ml-5 font-inter">
                              <div className="order-desc w-full">
                                        <h1 className='text-3xl text-[#B88E2F] font-bold tracking-tighter mb-5'>Recent Orders</h1>
                                        <div className="lg:flex flex-col w-full items-center justify-between">
                                                  {orders.length > 0 ? (
                                                            orders.map((order, index) => (
                                                                      <div key={index} ref={(el) => (componentRefs.current[index] = el)} className="border p-4 w-full rounded-md mb-6">
                                                                                <div className="flex justify-between items-center mb-4 px-4">
                                                                                          <p className={`font-semibold text-lg tracking-tighter ${order.status === false ? "text-red-500" : "text-black"}`}>
                                                                                                    Order ID:&nbsp;#{order.orderId} {order.status === false ? " [Payment Failed]" : ""}
                                                                                          </p>
                                                                                          {order.status === true && <ReactToPrint
                                                                                                    trigger={() => <button className="bg-[#F9F1E7] text-black border font-bold px-4 py-1 rounded">Get Invoice</button>}
                                                                                                    content={() => componentRefs.current[index]}
                                                                                          />}

                                                                                          <p className="text-gray-600 font-semibold text-sm">{formatDate(order.date)}</p>
                                                                                </div>
                                                                                <div className="flex flex-col space-y-4">
                                                                                          <div className="flex items-center justify-between bg-[#F9F1E7] p-4 rounded-lg">
                                                                                                    <p className="w-[30%] font-semibold">Item Name</p>
                                                                                                    <p className="w-[20%] font-semibold">Color</p>
                                                                                                    <p className="w-[15%] font-semibold">Quantity</p>
                                                                                                    <p className="w-[18%] font-semibold">Price</p>
                                                                                                    <p className="w-[15%] font-semibold">Subtotal</p>
                                                                                          </div>
                                                                                          {order.cartItems.length > 0 ? (
                                                                                                    order.cartItems.map((item, itemIndex) => (
                                                                                                              <div key={itemIndex} className="flex items-center justify-between p-4 border-2 rounded-lg">
                                                                                                                        <p className="w-[33%] tracking-tighter font-semibold ">{item.name} [{item.size}]</p>
                                                                                                                        <div className="w-[20%]">
                                                                                                                                  <div
                                                                                                                                            className="rounded-full h-5 w-5"
                                                                                                                                            style={{ backgroundColor: item.color }}
                                                                                                                                  ></div>
                                                                                                                        </div>
                                                                                                                        <p className="w-[15%] ">{item.quantity}</p>
                                                                                                                        <p className="w-[18%] tracking-tight font-semibold">₹ {(parseInt(item.price)).toLocaleString('en-IN')}</p>
                                                                                                                        <p className="w-[15%] tracking-tight font-bold">₹ {(item.quantity * item.price).toLocaleString('en-IN')}</p>
                                                                                                              </div>
                                                                                                    ))
                                                                                          ) : (
                                                                                                    <p className="text-gray-500">No items in this order.</p>
                                                                                          )}
                                                                                </div>
                                                                                <div className="flex justify-between px-4 items-center mt-4">
                                                                                          <p className="font-semibold text-black">{order.status === true ? "Paid: " : "Pending: "} <span className='text-[#B88E2F]'> ₹{parseInt(order.totalPrice).toLocaleString('en-IN')}</span></p>
                                                                                          {order.status === true && <p className="font-semibold text-sm text-gray-600">Delivery by: {calculateDeliveredByDate(order.date)}</p>}
                                                                                </div>
                                                                      </div>
                                                            ))
                                                  ) : (
                                                            <p className='text-gray-500 tracking-tighter'>No orders found.</p>
                                                  )}
                                        </div>
                              </div>
                    </div>
          );
}
