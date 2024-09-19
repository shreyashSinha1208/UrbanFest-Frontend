import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { faUser, faMagnifyingGlass, faHeart, faCartShopping, faBars, faShop, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../AuthContext';
import { MdExplore } from "react-icons/md";


export default function Navbar() {
      const [query, setQuery] = useState('');
      const [suggestions, setSuggestions] = useState([]);
      const [showSearchBar, setShowSearchBar] = useState(false);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const searchRef = useRef(null);
      const navigate = useNavigate();
      const inputRef = useRef(null);
      const { user, isAuthenticated, logout } = useAuth();
      const token = localStorage.getItem('authToken');
     // console.log(token);
      

      useEffect(() => {
            if (inputRef.current) {
                  inputRef.current.focus();
            }
      }, []);

      const handleSearch = async (e) => {
            const searchQuery = e.target.value;
            setQuery(searchQuery);

            if (searchQuery.length > 0) {
                  try {
                        const response = await axios.post('https://urbanfest.onrender.com/search',  { query: searchQuery }, { withCredentials: true });
                        setSuggestions(response.data);
                  } catch (error) {
                        console.error('Error fetching search results:', error);
                  }
            } else {
                  setSuggestions([]);
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
                  setSuggestions([]); // Hide suggestions when clicking outside
            }
      };

      const handleRedirect = (id) => {
            navigate(`/products/show/${id}`);
            setSuggestions([]);
            setShowSearchBar(false);
            setQuery("");
      };

      const toggleDropdown = () => {
            setDropdownOpen(!dropdownOpen);
      };

      return (
            <div className='sticky shadow-gray-100 shadow-md top-0 left-0 font-inter bg-white/70 h-20 z-50 backdrop-blur-md'>

                  <div className="navbar flex justify-between lg:justify-between lg:mx-20 mx-10 mt-2 h-20 bg-transparent ">

                        <div className="left-logo flex items-center lg:justify-start justify-center">
                              <div>
                                    <Link to="/">
                                          <img className='h-8 lg:mr-3 mr-1 w-12' src={Logo} alt="Logo-Image" />
                                    </Link>
                              </div>
                              <div className="logo-name">
                                    <Link to="/">
                                          <h1 className='lg:text-2xl lg:block hidden text-lg text-[#B88E2F] font-extrabold tracking-tighter'>UrbanFest</h1>
                                    </Link>
                              </div>
                        </div>

                        <div className="search-div w-4/12 flex items-center justify-center">
                              <div className="relative lg:block hidden w-full">
                                    <input
                                          type="text"
                                          id="search"
                                          className="bg-gray-50 outline-none border text-gray-900 text-sm rounded-3xl block w-full pl-10 p-2.5"
                                          placeholder="Search for products"
                                          value={query}
                                          onChange={handleSearch}
                                          autoComplete="off"
                                          required
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
                                    </div>
                                    <div className="absolute top-12 bg-white w-full shadow-lg rounded-xl z-50">
                                          {suggestions.length > 0 ? (
                                                <ul className="divide-y divide-brown-200">
                                                      {suggestions.map((item, index) => (
                                                            <li
                                                                  key={index}
                                                                  className="p-2 hover:bg-[#B88E2F] hover:text-white cursor-pointer"
                                                                  onClick={() => handleRedirect(item._id)}
                                                            >
                                                                  {item.name}
                                                            </li>
                                                      ))}
                                                </ul>
                                          ) : (
                                                query.length > 0 && <p className="text-brown-600 text-center"></p>
                                          )}
                                    </div>
                              </div>
                        </div>

                        <div className="middle-nav hidden lg:flex items-center justify-between">
                              <div className="hidden lg:flex justify-between items-center">
                                    <div className='font-medium transform hover:text-[#B88E2F] duration-500 '>
                                          <Link to="/shop">
                                                <FontAwesomeIcon icon={faShop} className='mr-3' />
                                                Shop
                                          </Link>
                                    </div>


                                    <div className='relative font-medium transform ml-10 hover:text-[#B88E2F] duration-500 cursor-pointer' onClick={toggleDropdown}>
                                          <div className='flex items-center'>
                                                <MdExplore className='mr-3 h-6 w-6' />
                                                Explore
                                          </div>
                                          {dropdownOpen && (
                                                <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg">
                                                      <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            About
                                                      </Link>
                                                      <a
                                                            href="mailto:shreyash.cs22@bmsce.ac.in"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                      >
                                                            Contact
                                                      </a>
                                                      <Link to="/blogs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            Blogs
                                                      </Link>
                                                </div>
                                          )}
                                    </div>

                                    {isAuthenticated ? (
                                          <div className='ml-10 transform hover:text-[#B88E2F] duration-500 cursor-pointer'>
                                                <Link to="/profile">
                                                      <FontAwesomeIcon icon={faUser} className='h-4' />
                                                      <span className='ml-3 lg:inline hidden font-semibold'>Profile</span>
                                                </Link>
                                          </div>
                                    ) : (
                                          <div className='ml-10 transform hover:text-[#B88E2F] duration-500 cursor-pointer'>
                                                <Link to="/login">
                                                      <FontAwesomeIcon icon={faUser} className='h-4' />
                                                      <span className='ml-2 lg:inline hidden font-semibold'>Login</span>
                                                </Link>
                                          </div>
                                    )}
                              </div>
                        </div>

                        <div className="right-nav flex items-center space-x-4">

                              <div className='lg:hidden inline'>
                                    <FontAwesomeIcon onClick={() => setShowSearchBar(!showSearchBar)} icon={faMagnifyingGlass} className='h-4 transform hover:text-[#B88E2F] duration-500 cursor-pointer' />
                              </div>
                              <div className='ml-7'>
                                    <Link to="/wishlist">
                                          <FontAwesomeIcon icon={faHeart} className='h-4 transform hover:text-[#B88E2F] duration-500 cursor-pointer' />
                                    </Link>
                              </div>
                              <div className='ml-7'>
                                    <Link to="/cart">
                                          <FontAwesomeIcon icon={faCartShopping} className='h-4 transform hover:text-[#B88E2F] duration-500 cursor-pointer' />
                                    </Link>
                              </div>
                        </div>

                  </div>

                  {showSearchBar && (
                        <div className="search-bar lg:hidden block p-4 bg-white shadow-md">
                              <div className="relative w-full">
                                    <input
                                          type="text"
                                          id="search"
                                          className="bg-gray-50 focus:border-[#B88E2F] outline-none border-2 text-gray-900 text-sm rounded-3xl block w-full pl-10 p-2.5"
                                          placeholder="Search for products"
                                          value={query}
                                          onChange={handleSearch}
                                          autoComplete="off"
                                          required
                                          ref={inputRef}
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
                                    </div>
                                    <div className="absolute top-12 bg-white w-full shadow-lg rounded-xl z-50">
                                          {suggestions.length > 0 ? (
                                                <ul className="divide-y divide-brown-200">
                                                      {suggestions.map((item, index) => (
                                                            <li
                                                                  key={index}
                                                                  className="p-2 hover:bg-[#B88E2F] hover:text-white cursor-pointer"
                                                                  onClick={() => handleRedirect(item._id)}
                                                            >
                                                                  {item.name}
                                                            </li>
                                                      ))}
                                                </ul>
                                          ) : (
                                                query.length > 0 && <p className="text-brown-600 text-center"></p>
                                          )}
                                    </div>
                              </div>
                        </div>
                  )}

            </div>
      );
}
