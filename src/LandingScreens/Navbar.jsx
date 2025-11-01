import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { faUser, faMagnifyingGlass, faHeart, faCartShopping, faBars, faShop } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../AuthContext';
import { MdExplore } from "react-icons/md";
import MobileSidebar from './MobileSidebar';

export default function Navbar() {
      const [query, setQuery] = useState('');
      const [suggestions, setSuggestions] = useState([]);
      const [showSearchBar, setShowSearchBar] = useState(false);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const [selectedIndex, setSelectedIndex] = useState(-1);
      const searchRef = useRef(null);
      const navigate = useNavigate();
      const inputRef = useRef(null);
      const { user, isAuthenticated, logout } = useAuth();

      // Calculate cart quantity
      const cartQuantity = user?.cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;

      useEffect(() => {
            if (showSearchBar && inputRef.current) {
                  inputRef.current.focus();
            }
      }, [showSearchBar]);

      const handleSearch = async (e) => {
            const searchQuery = e.target.value;
            setQuery(searchQuery);
            setSelectedIndex(-1);

            if (searchQuery.length > 0) {
                  try {
                        const response = await axios.post('http://localhost:5000/search', { query: searchQuery }, { withCredentials: true });
                        setSuggestions(response.data);
                  } catch (error) {
                        console.log('Error fetching search results:', error);
                  }
            } else {
                  setSuggestions([]);
            }
      };

      const handleKeyDown = (e) => {
            if (suggestions.length === 0) return;

            switch (e.key) {
                  case 'ArrowDown':
                        e.preventDefault();
                        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
                        break;
                  case 'ArrowUp':
                        e.preventDefault();
                        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
                        break;
                  case 'Enter':
                        e.preventDefault();
                        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                              handleRedirect(suggestions[selectedIndex]._id);
                        }
                        break;
                  case 'Escape':
                        setSuggestions([]);
                        setSelectedIndex(-1);
                        break;
                  default:
                        break;
            }
      };

      useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, []);

      const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                  setSuggestions([]);
                  setSelectedIndex(-1);
            }
      };

      const handleRedirect = (id) => {
            navigate(`/products/show/${id}`);
            setSuggestions([]);
            setShowSearchBar(false);
            setQuery("");
            setSelectedIndex(-1);
      };

      const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen);
      };

      const toggleMobileMenu = () => {
            setMobileMenuOpen(!mobileMenuOpen);
            setDropdownOpen(false);
      };

      const closeMobileMenu = () => {
            setMobileMenuOpen(false);
            setDropdownOpen(false);
      };

      return (
            <>
                  <div className='sticky top-0 left-0 bg-white/95 h-16 lg:h-20 z-50 backdrop-blur-lg border-b border-gray-100'>

                        {/* Desktop & Tablet Navbar */}
                        <div className="navbar hidden md:flex justify-between items-center lg:mx-20 mx-6 h-full">

                              {/* Left - Logo */}
                              <div className="flex items-center space-x-3">
                                    <Link to="/" className='flex items-center space-x-3 group'>
                                          <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                                className='h-10 w-16'
                                                src={Logo}
                                                alt="Logo"
                                          />
                                    </Link>
                              </div>

                              {/* Center - Search Bar */}
                              <div className="flex-1 max-w-2xl mx-8">
                                    <div className="relative z-50" ref={searchRef}>
                                          <input
                                                type="text"
                                                className="bg-gray-50/50 hover:bg-gray-50 focus:bg-white outline-none border border-gray-200 focus:border-[#B88E2F] text-gray-900 text-sm rounded-full block w-full pl-11 pr-4 py-2.5 transition-all duration-300"
                                                placeholder="Search for products..."
                                                value={query}
                                                onChange={handleSearch}
                                                onKeyDown={handleKeyDown}
                                                autoComplete="off"
                                          />
                                          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
                                          </div>
                                          <AnimatePresence>
                                                {suggestions.length > 0 && (
                                                      <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute top-full mt-2 bg-white w-full rounded-xl border border-gray-100 overflow-hidden z-50"
                                                      >
                                                            <ul className="max-h-96 overflow-y-auto">
                                                                  {suggestions.map((item, index) => (
                                                                        <motion.li
                                                                              key={index}
                                                                              initial={{ opacity: 0, x: -20 }}
                                                                              animate={{ opacity: 1, x: 0 }}
                                                                              transition={{ delay: index * 0.05 }}
                                                                              className={`p-2 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0 ${selectedIndex === index ? 'bg-[#B88E2F] text-white' : 'hover:bg-[#B88E2F] hover:text-white'
                                                                                    }`}
                                                                              onClick={() => handleRedirect(item._id)}
                                                                        >
                                                                              <div className="flex items-center space-x-2">
                                                                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs opacity-50" />
                                                                                    <span>{item.name}</span>
                                                                              </div>
                                                                        </motion.li>
                                                                  ))}
                                                            </ul>
                                                      </motion.div>
                                                )}
                                          </AnimatePresence>
                                    </div>
                              </div>

                              {/* Right - Navigation & Icons */}
                              <div className="flex items-center space-x-6">
                                    {/* Shop Link */}
                                    <Link to="/shop" className='flex items-center space-x-2 font-medium text-gray-700 hover:text-[#B88E2F] transition-colors duration-300'>
                                          <FontAwesomeIcon icon={faShop} className='text-lg' />
                                          <span className="hidden lg:inline">Shop</span>
                                    </Link>

                                    {/* Explore Dropdown */}
                                    <div className='relative'>
                                          <button
                                                onClick={toggleDropdown}
                                                className='flex items-center space-x-2 font-medium text-gray-700 hover:text-[#B88E2F] transition-colors duration-300'
                                          >
                                                <MdExplore className='text-2xl' />
                                                <span className="hidden lg:inline">Explore</span>
                                          </button>
                                          <AnimatePresence>
                                                {dropdownOpen && (
                                                      <motion.div
                                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                                                      >
                                                            <Link
                                                                  to="/about"
                                                                  onClick={() => setDropdownOpen(false)}
                                                                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#B88E2F] hover:text-white transition-colors duration-200"
                                                            >
                                                                  About Us
                                                            </Link>
                                                            <a
                                                                  href="mailto: urbanfest.help@gmail.com"
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                  onClick={() => setDropdownOpen(false)}
                                                                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#B88E2F] hover:text-white transition-colors duration-200"
                                                            >
                                                                  Contact
                                                            </a>
                                                            <Link
                                                                  to="/blogs"
                                                                  onClick={() => setDropdownOpen(false)}
                                                                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#B88E2F] hover:text-white transition-colors duration-200"
                                                            >
                                                                  Blogs
                                                            </Link>
                                                      </motion.div>
                                                )}
                                          </AnimatePresence>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-6 w-px bg-gray-200"></div>

                                    {/* Wishlist */}
                                    <Link to="/wishlist" className='relative group'>
                                          <FontAwesomeIcon icon={faHeart} className='text-lg text-gray-700 group-hover:text-red-500 transition-colors duration-300' />
                                    </Link>

                                    {/* Cart with Badge */}
                                    <Link to="/cart" className='relative group'>
                                          <FontAwesomeIcon icon={faCartShopping} className='text-lg text-gray-700 group-hover:text-[#B88E2F] transition-colors duration-300' />
                                          {cartQuantity > 0 && (
                                                <motion.span
                                                      initial={{ scale: 0 }}
                                                      animate={{ scale: 1 }}
                                                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                                                >
                                                      {cartQuantity > 99 ? '99+' : cartQuantity}
                                                </motion.span>
                                          )}
                                    </Link>

                                    {/* Profile */}
                                    {isAuthenticated ? (
                                          <Link to="/profile" className='group'>
                                                {user?.picture ? (
                                                      <motion.img
                                                            whileHover={{ scale: 1.1 }}
                                                            src={user.picture}
                                                            alt="Profile"
                                                            className='h-8 w-8 rounded-full object-cover border-2 border-gray-200 group-hover:border-[#B88E2F] transition-all duration-300'
                                                      />
                                                ) : (
                                                      <motion.div
                                                            whileHover={{ scale: 1.1 }}
                                                            className='h-8 w-8 rounded-full bg-[#B88E2F] flex items-center justify-center text-white font-semibold group-hover:bg-[#9a7526] transition-colors duration-300'
                                                      >
                                                            {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                                                      </motion.div>
                                                )}
                                          </Link>
                                    ) : (
                                          <Link to="/login" className='group'>
                                                <FontAwesomeIcon icon={faUser} className='text-lg text-gray-700 group-hover:text-[#B88E2F] transition-colors duration-300' />
                                          </Link>
                                    )}
                              </div>

                        </div>

                        {/* Mobile Navbar */}
                        <div className="navbar md:hidden flex justify-between items-center px-4 h-16">

                              {/* Left - Menu Button */}
                              <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={toggleMobileMenu}
                                    className='p-2 -ml-2 text-gray-700 hover:text-[#B88E2F] transition-colors duration-300'
                              >
                                    <FontAwesomeIcon icon={faBars} className='text-xl' />
                              </motion.button>

                              {/* Center - Logo (Absolutely Centered) */}
                              <div className="absolute left-1/2 transform -translate-x-1/2">
                                    <a href="/" className='flex items-center'>
                                          <img src={Logo} alt="Logo" className='h-10 w-16' />
                                    </a>
                              </div>

                              {/* Right - Search & Cart */}
                              <div className="flex items-center space-x-3">
                                    <motion.button
                                          whileTap={{ scale: 0.9 }}
                                          onClick={() => setShowSearchBar(!showSearchBar)}
                                          className='p-2 text-gray-700 hover:text-[#B88E2F] transition-colors duration-300'
                                          title="Search"
                                    >
                                          <FontAwesomeIcon icon={faMagnifyingGlass} className='text-lg' />
                                    </motion.button>
                                    <Link to="/cart" className='relative text-gray-700 hover:text-[#B88E2F] transition-colors duration-300'>
                                          <FontAwesomeIcon icon={faCartShopping} className='text-lg' />
                                          {cartQuantity > 0 && (
                                                <motion.span
                                                      initial={{ scale: 0 }}
                                                      animate={{ scale: 1 }}
                                                      className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
                                                >
                                                      {cartQuantity > 9 ? '9+' : cartQuantity}
                                                </motion.span>
                                          )}
                                    </Link>
                              </div>

                        </div>
                        {/* Mobile Search Bar */}
                        <AnimatePresence>
                              {showSearchBar && (
                                    <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="md:hidden border-t border-gray-100 overflow-visible bg-white"
                                    >
                                          <div className="p-4">
                                                <div className="relative z-[60]" ref={searchRef}>
                                                      <input
                                                            type="text"
                                                            className="bg-gray-50 focus:bg-white outline-none border border-gray-200 focus:border-[#B88E2F] text-gray-900 text-sm rounded-full block w-full pl-11 pr-4 py-2.5 transition-all duration-300"
                                                            placeholder="Search for products..."
                                                            value={query}
                                                            onChange={handleSearch}
                                                            onKeyDown={handleKeyDown}
                                                            autoComplete="off"
                                                            ref={inputRef}
                                                      />
                                                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
                                                      </div>
                                                      <AnimatePresence>
                                                            {suggestions.length > 0 && (
                                                                  <motion.div
                                                                        initial={{ opacity: 0, y: -10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0, y: -10 }}
                                                                        className="absolute top-full mt-2 bg-white w-full rounded-xl border border-gray-100 shadow-md overflow-hidden z-[70]"
                                                                  >
                                                                        <ul className="max-h-64 overflow-y-auto overflow-x-hidden">
                                                                              {suggestions.map((item, index) => (
                                                                                    <motion.li
                                                                                          key={index}
                                                                                          initial={{ opacity: 0, x: -10 }}
                                                                                          animate={{ opacity: 1, x: 0 }}
                                                                                          transition={{ delay: index * 0.05 }}
                                                                                          className={`p-2 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0 ${selectedIndex === index ? 'bg-[#B88E2F] text-white' : 'hover:bg-[#B88E2F] hover:text-white'
                                                                                                }`}
                                                                                          onClick={() => handleRedirect(item._id)}
                                                                                    >
                                                                                          <div className="flex items-center space-x-2">
                                                                                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs opacity-50 flex-shrink-0" />
                                                                                                <span className="truncate text-sm">{item.name}</span>
                                                                                          </div>
                                                                                    </motion.li>
                                                                              ))}
                                                                        </ul>
                                                                  </motion.div>
                                                            )}
                                                      </AnimatePresence>
                                                </div>
                                          </div>
                                    </motion.div>
                              )}
                        </AnimatePresence>

                  </div>

                  {/* Mobile Menu Sidebar */}
                  <MobileSidebar
                        mobileMenuOpen={mobileMenuOpen}
                        closeMobileMenu={closeMobileMenu}
                        isAuthenticated={isAuthenticated}
                        user={user}
                        logout={logout}
                  />
            </>
      );
}