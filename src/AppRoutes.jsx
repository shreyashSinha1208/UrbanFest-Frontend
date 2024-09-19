import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingScreen from './LoadingScreen/LoadingScreen.jsx';
import Navbar from './LandingScreens/Navbar.jsx';
import Footer from './Footer/Footer.jsx';
import LoginScreen from './LoginSection/LoginScreen.jsx';
import ShopScreen from './ShopScreens/ShopScreen.jsx';
import Show from './ShowScreens/Show.jsx';
import Wishlist from './WishListScreens/WishList.jsx';
import CheckoutScreen from './CheckoutScreens/CheckoutScreen.jsx';
import CheckOutHeader from './CheckoutScreens/CheckOutHeader.jsx';
import PaymentSuccessful from './PaymentFinished/PaymentSuccessful.jsx';
import CartHeader from './CartScreens/CartHeader.jsx';
import CartScreen from './CartScreens/CartScreen.jsx';
import CartFooter from './CartScreens/CartFooter.jsx';
import ProfileScreen from './ProfileSection/ProfileScreen.jsx';
import AboutScreen from './AboutScreens/AboutScreen.jsx';
import SignUpScreen from './LoginSection/SignUpScreen.jsx';
import BrowseRange from './MiddleSection/BrowseRange';
import Product from './MiddleSection/Product';
import ParentCarousel from './MiddleSection/ParentCarousel';
import Hero from './LandingScreens/Hero';
import Testimonials from './MiddleSection/Testimonials';
import BlogsScreen from './AboutScreens/BlogsScreen.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppRoutes = ({ loading }) => {

          const navigate = useNavigate();

          // useEffect(() => {
          //           const checkSession = async () => {
          //                     try {
          //                               const response = await axios.get('https://urbanfest.onrender.com/check', {
          //                                         withCredentials: true,
          //                               });

          //                               const data = response.data;
          //                               console.log("Session data:", data.sessionActive);
          //                               console.log(response.data);    
          //                               // if (!data.sessionActive) {
          //                               //           localStorage.removeItem('user');
          //                               //           navigate('/login');
          //                               // }
          //                     } catch (error) {
          //                               console.error('Error checking session:', error);
          //                     }
          //           };

          //           checkSession();
          // }, [navigate]);

          return (
                    <Routes>
                              <Route
                                        path="/"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <div className="lg:hidden block">
                                                                      <ParentCarousel />
                                                            </div>
                                                            <Hero />
                                                            <BrowseRange />
                                                            <Product />
                                                            <div className="hidden lg:block">
                                                                      <ParentCarousel />
                                                            </div>
                                                            <Testimonials />
                                                            <Footer />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/login"
                                        element={loading ? <LoadingScreen /> : <LoginScreen />}
                              />
                              <Route
                                        path="/blogs"
                                        element={loading ? <LoadingScreen /> : <>
                                                  <Navbar />
                                                  <BlogsScreen />
                                        </>}

                              />
                              <Route
                                        path="/about"
                                        element={loading ? <LoadingScreen /> : <AboutScreen />}
                              />
                              <Route
                                        path="/signup"
                                        element={loading ? <LoadingScreen /> : <SignUpScreen />}
                              />
                              <Route
                                        path="/products/show/:productId"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <Show />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/wishlist"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <Wishlist />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/checkout"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <CheckOutHeader />
                                                            <CheckoutScreen />
                                                            <CartFooter />
                                                            <Footer />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/shop"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <ShopScreen />
                                                            <Footer />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/payment/successful"
                                        element={loading ? <LoadingScreen /> : <PaymentSuccessful />}
                              />
                              <Route
                                        path="/cart"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <CartHeader />
                                                            <CartScreen />
                                                            <CartFooter />
                                                            <Footer />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/profile/:section"
                                        element={
                                                  <>
                                                            <Navbar />
                                                            <ProfileScreen />
                                                            <Footer />
                                                  </>
                                        }
                              />
                              <Route
                                        path="/profile"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <ProfileScreen />
                                                            <Footer />
                                                  </>
                                        )}
                              />
                    </Routes>
          );
};

export default AppRoutes;
