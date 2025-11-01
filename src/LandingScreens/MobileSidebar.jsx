import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { faUser, faHeart, faShop, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdExplore } from "react-icons/md";
import { FaUserCircle, FaBox, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function MobileSidebar({ mobileMenuOpen, closeMobileMenu, isAuthenticated, user, logout }) {
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
      const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
      const sidebar = useRef(null);
      const navigate = useNavigate();

      const handleLogoutClick = () => {
            setShowLogoutConfirm(true);
      };

      const confirmLogout = () => {
            logout();
            setShowLogoutConfirm(false);
            closeMobileMenu();
            navigate('/', { state: { message: 'Logged out successfully' }, replace: true });
      };

      const cancelLogout = () => {
            setShowLogoutConfirm(false);
      };

      const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen);
            setProfileDropdownOpen(false);
      };

      const toggleProfileDropdown = () => {
            setProfileDropdownOpen(!profileDropdownOpen);
            setDropdownOpen(false);
      };

      const handleLogout = () => {
            logout();
            closeMobileMenu();
            navigate('/', { state: { message: 'Logged out successfully' }, replace: true });
      };

      // Framer Motion Variants
      const overlayVariants = {
            hidden: { opacity: 0 },
            visible: {
                  opacity: 1,
                  transition: { duration: 0.3 }
            },
            exit: {
                  opacity: 0,
                  transition: { duration: 0.3 }
            }
      };

      const sidebarVariants = {
            hidden: {
                  x: '-100%',
                  transition: {
                        type: 'tween',
                        duration: 0.3,
                        ease: 'easeInOut'
                  }
            },
            visible: {
                  x: 0,
                  transition: {
                        type: 'tween',
                        duration: 0.3,
                        ease: 'easeInOut'
                  }
            },
            exit: {
                  x: '-100%',
                  transition: {
                        type: 'tween',
                        duration: 0.3,
                        ease: 'easeInOut'
                  }
            }
      };

      const dropdownVariants = {
            hidden: {
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.2 }
            },
            visible: {
                  opacity: 1,
                  height: 'auto',
                  transition: { duration: 0.3 }
            }
      };

      const itemVariants = {
            hidden: { opacity: 0, x: -20 },
            visible: (i) => ({
                  opacity: 1,
                  x: 0,
                  transition: {
                        delay: i * 0.1,
                        duration: 0.3
                  }
            })
      };

      useEffect(() => {
            if (!mobileMenuOpen) return;
            const handleClickOutside = (event) => {
                  if (sidebar.current && !sidebar.current.contains(event.target)) {
                        closeMobileMenu();
                  }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
      }, [mobileMenuOpen, closeMobileMenu]);

      return (
            <AnimatePresence>
                  {mobileMenuOpen && (
                        <>
                              {/* Overlay with fade animation */}
                              <motion.div
                                    variants={overlayVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                                    onClick={closeMobileMenu}
                              />

                              {/* Sidebar with slide animation */}
                              <motion.div
                                    variants={sidebarVariants}
                                    // ref ={}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="fixed top-0 left-0 h-full w-72 bg-white z-50 md:hidden overflow-y-auto overflow-x-hidden"
                              >

                                    {/* Header */}
                                    <div className="flex items-center justify-between p-3 border-b border-gray-100">
                                          <div className="flex items-center space-x-3">
                                                <img className='h-8 w-12' src={Logo} alt="Logo" />
                                          </div>
                                          <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={closeMobileMenu}
                                                className='p-2 text-gray-700 hover:text-[#B88E2F] transition-colors'
                                          >
                                                <FontAwesomeIcon icon={faTimes} className='text-xl' />
                                          </motion.button>
                                    </div>

                                    {/* Profile Section */}
                                    <motion.div
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.1 }}
                                          className="p-4 border-b border-gray-100"
                                    >
                                          {isAuthenticated ? (
                                                <div className="flex items-center space-x-3">
                                                      {user?.picture ? (
                                                            <img
                                                                  src={user.picture}
                                                                  alt="Profile"
                                                                  className='h-12 w-12 rounded-full object-cover border-2 border-gray-200'
                                                            />
                                                      ) : (
                                                            <div className='h-12 w-12 rounded-full bg-[#B88E2F] flex items-center justify-center text-white font-semibold text-lg'>
                                                                  {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                      )}
                                                      <div className="overflow-hidden">
                                                            <p className="font-semibold text-gray-800 truncate">{user?.username || user?.email || 'User'}</p>
                                                            <p className="text-sm text-gray-500">Welcome back!</p>
                                                      </div>
                                                </div>
                                          ) : (
                                                <Link to="/login" onClick={closeMobileMenu} className="flex items-center space-x-3">
                                                      <div className='h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0'>
                                                            <FontAwesomeIcon icon={faUser} className='text-gray-600 text-xl' />
                                                      </div>
                                                      <div>
                                                            <p className="font-semibold text-gray-800">Sign In</p>
                                                            <p className="text-sm text-gray-500">Login to your account</p>
                                                      </div>
                                                </Link>
                                          )}
                                    </motion.div>

                                    {/* Menu Items */}
                                    <nav className="p-4 overflow-x-hidden">

                                          {/* Profile Dropdown - Only shows when authenticated */}
                                          {isAuthenticated && (
                                                <motion.div
                                                      custom={2}
                                                      variants={itemVariants}
                                                      initial="hidden"
                                                      animate="visible"
                                                      className="mt-2"
                                                >
                                                      <button
                                                            onClick={toggleProfileDropdown}
                                                            className='flex items-center justify-between w-full p-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#B88E2F] transition-all duration-200'
                                                      >
                                                            <div className="flex items-center space-x-4">
                                                                  <FontAwesomeIcon icon={faUser} className='text-xl w-6' />
                                                                  <span className="font-medium">Profile</span>
                                                            </div>
                                                            <motion.svg
                                                                  animate={{ rotate: profileDropdownOpen ? 180 : 0 }}
                                                                  transition={{ duration: 0.3 }}
                                                                  className='w-5 h-5 flex-shrink-0'
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  viewBox="0 0 24 24"
                                                            >
                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </motion.svg>
                                                      </button>

                                                      <AnimatePresence>
                                                            {profileDropdownOpen && (
                                                                  <motion.div
                                                                        variants={dropdownVariants}
                                                                        initial="hidden"
                                                                        animate="visible"
                                                                        exit="hidden"
                                                                        className="ml-10 mt-2 space-y-1 overflow-hidden"
                                                                  >
                                                                        <Link
                                                                              to="/profile/personal"
                                                                              onClick={closeMobileMenu}
                                                                              className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-all duration-200"
                                                                        >
                                                                              <FaUserCircle className="text-lg flex-shrink-0" />
                                                                              <span>Your Details</span>
                                                                        </Link>
                                                                        <Link
                                                                              to="/profile/orders"
                                                                              onClick={closeMobileMenu}
                                                                              className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-all duration-200"
                                                                        >
                                                                              <FaBox className="text-lg flex-shrink-0" />
                                                                              <span>Orders</span>
                                                                        </Link>
                                                                        <Link
                                                                              to="/profile/address"
                                                                              onClick={closeMobileMenu}
                                                                              className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-all duration-200"
                                                                        >
                                                                              <FaMapMarkerAlt className="text-lg flex-shrink-0" />
                                                                              <span>Address</span>
                                                                        </Link>
                                                                        <button
                                                                              onClick={handleLogoutClick}
                                                                              className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-all duration-200 w-full"
                                                                        >
                                                                              <FaSignOutAlt className="text-lg text-red-500 flex-shrink-0" />
                                                                              <span className='text-red-500'>Logout</span>
                                                                        </button>
                                                                  </motion.div>
                                                            )}
                                                      </AnimatePresence>
                                                </motion.div>
                                          )}

                                          <motion.div
                                                custom={3}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                          >
                                                <Link
                                                      to="/wishlist"
                                                      onClick={closeMobileMenu}
                                                      className='flex items-center space-x-4 p-4 mt-2 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#B88E2F] transition-all duration-200'
                                                >
                                                      <FontAwesomeIcon icon={faHeart} className='text-xl w-6 flex-shrink-0' />
                                                      <span className="font-medium">Wishlist</span>
                                                </Link>
                                          </motion.div>

                                          <motion.div
                                                custom={0}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                          >
                                                <Link
                                                      to="/shop"
                                                      onClick={closeMobileMenu}
                                                      className='flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#B88E2F] transition-all duration-200'
                                                >
                                                      <FontAwesomeIcon icon={faShop} className='text-xl w-6 flex-shrink-0' />
                                                      <span className="font-medium">Shop</span>
                                                </Link>
                                          </motion.div>

                                          <motion.div
                                                custom={1}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="mt-2"
                                          >
                                                <button
                                                      onClick={toggleDropdown}
                                                      className='flex items-center justify-between w-full p-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#B88E2F] transition-all duration-200'
                                                >
                                                      <div className="flex items-center space-x-4">
                                                            <MdExplore className='text-2xl w-6 flex-shrink-0' />
                                                            <span className="font-medium">Explore</span>
                                                      </div>
                                                      <motion.svg
                                                            animate={{ rotate: dropdownOpen ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className='w-5 h-5 flex-shrink-0'
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                      </motion.svg>
                                                </button>

                                                <AnimatePresence>
                                                      {dropdownOpen && (
                                                            <motion.div
                                                                  variants={dropdownVariants}
                                                                  initial="hidden"
                                                                  animate="visible"
                                                                  exit="hidden"
                                                                  className="ml-10 mt-2 space-y-1 overflow-hidden"
                                                            >
                                                                  <Link
                                                                        to="/about"
                                                                        onClick={closeMobileMenu}
                                                                        className="block p-3 rounded-lg text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-all duration-200"
                                                                  >
                                                                        About Us
                                                                  </Link>
                                                                  <a
                                                                        href="mailto: urbanfest.help@gmail.com"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        onClick={closeMobileMenu}
                                                                        className="block p-3 rounded-lg text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-all duration-200"
                                                                  >
                                                                        Contact
                                                                  </a>
                                                                  <Link
                                                                        to="/blogs"
                                                                        onClick={closeMobileMenu}
                                                                        className="block p-3 rounded-lg text-gray-600 hover:bg-[#B88E2F] hover:text-white transition-all duration-200"
                                                                  >
                                                                        Blogs
                                                                  </Link>
                                                            </motion.div>
                                                      )}
                                                </AnimatePresence>
                                          </motion.div>
                                    </nav>

                              </motion.div>
                              <AnimatePresence>
                                    {showLogoutConfirm && (
                                          <>
                                                <motion.div
                                                      initial={{ opacity: 0 }}
                                                      animate={{ opacity: 1 }}
                                                      exit={{ opacity: 0 }}
                                                      className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                                                      onClick={cancelLogout}
                                                />

                                                {/* Wrapper handles centering */}
                                                <div className="fixed inset-0 z-[70] flex items-center justify-center">
                                                      <motion.div
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-2xl"
                                                      >
                                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                                  Confirm Logout
                                                            </h3>
                                                            <p className="text-gray-600 mb-6">
                                                                  Are you sure you want to logout?
                                                            </p>
                                                            <div className="flex gap-3">
                                                                  <motion.button
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={cancelLogout}
                                                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                                                  >
                                                                        Cancel
                                                                  </motion.button>
                                                                  <motion.button
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={confirmLogout}
                                                                        className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                                                                  >
                                                                        Logout
                                                                  </motion.button>
                                                            </div>
                                                      </motion.div>
                                                </div>
                                          </>
                                    )}
                              </AnimatePresence>

                        </>
                  )}
            </AnimatePresence>
      );
}