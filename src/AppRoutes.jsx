import React from 'react';
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
import Product from './MiddleSection/Product';
import ParentCarousel from './MiddleSection/ParentCarousel';
import Hero from './LandingScreens/Hero';
import Testimonials from './MiddleSection/Testimonials';
import BlogsScreen from './AboutScreens/BlogsScreen.jsx';
import CartSuggestions from './CartScreens/CartSuggestions.jsx';
import ScrollToTop from './ScrollTop.jsx';

const AppRoutes = ({ loading }) => {
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
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <BlogsScreen />
                                                            <Footer />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/about"
                                        element={loading ? <LoadingScreen /> :
                                                  <>
                                                            <Navbar />
                                                            <AboutScreen />
                                                            <Footer />
                                                  </>

                                        }
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
                                                            <Footer />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/wishlist"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <Wishlist />
                                                            <Footer />
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
                                                            <CartSuggestions />
                                                            <CartScreen />
                                                            <CartFooter />
                                                            <Footer />
                                                  </>
                                        )}
                              />
                              <Route
                                        path="/profile/:section"
                                        element={loading ? <LoadingScreen /> : (
                                                  <>
                                                            <Navbar />
                                                            <ProfileScreen />
                                                            <Footer />
                                                  </>
                                        )}
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