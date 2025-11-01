import { useState, useEffect } from 'react';
import { FaLinkedin, FaFacebook, FaNodeJs, FaReact, FaGithub } from 'react-icons/fa';
import { FaSquareInstagram } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import { SiMongodb, SiExpress } from 'react-icons/si';
import { RiTailwindCssFill } from 'react-icons/ri';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import Logo from '../assets/Logo.png';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Footer = () => {
  const { user, updateUser } = useAuth();
  const [email, setEmail] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      if (user.hasSubscription) {
        setHasSubscribed(true);
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        ' https://urbanfest.onrender.com/subscription',
        { email },
        { withCredentials: true }
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (response.data.user) {
        updateUser(response.data.user);
      }

      setHasSubscribed(true);
    } catch (error) {
      setError('Oops! Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <footer className="w-full tracking-tight bg-gradient-to-b from-[#FCF8F3] to-[#F5EFE7] ">
      {/* Main Footer Content */}
      <div className="mx-auto px-6 sm:px-10 lg:px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col  items-start">
            <a href="/" className="flex  group">
              <div className="w-14 h-14 rounded-lg transform transition-transform group-hover:scale-105">
                <img src={Logo} alt="UrbanFest Logo" />
              </div>
              <span className="text-3xl font-extrabold tracking-tighter text-[#B88E2F] ml-3">
                UrbanFest
              </span>
            </a>

            <p className="text-gray-600 text-left mb-6 leading-relaxed max-w-sm">
              Your premier destination for urban lifestyle and modern living. Discover curated collections that transform spaces.
            </p>

            {/* Tech Stack */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-left">
                Built With
              </p>
              <div className="flex  md:justify-center justify-start gap-3">
                <div className="group relative">
                  <SiMongodb size={32} className="text-[#417E38] transition-transform hover:scale-110 cursor-pointer" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    MongoDB
                  </span>
                </div>
                <div className="group relative">
                  <SiExpress size={32} className="text-gray-700 transition-transform hover:scale-110 cursor-pointer" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Express
                  </span>
                </div>
                <div className="group relative">
                  <FaReact size={32} className="text-[#58C4DC] transition-transform hover:scale-110 cursor-pointer" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    React
                  </span>
                </div>
                <div className="group relative">
                  <FaNodeJs size={32} className="text-[#417E38] transition-transform hover:scale-110 cursor-pointer" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Node.js
                  </span>
                </div>
                <div className="group relative">
                  <RiTailwindCssFill size={32} className="text-[#38BDF8] transition-transform hover:scale-110 cursor-pointer" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Tailwind CSS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col  md:items-start">
            <h4 className="text-lg font-bold text-gray-900 mb-3 relative">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-600 hover:text-[#B88E2F] transition-colors font-medium flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#B88E2F] transition-all mr-0 group-hover:mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/blogs" className="text-gray-600 hover:text-[#B88E2F] transition-colors font-medium flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#B88E2F] transition-all mr-0 group-hover:mr-2"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-600 hover:text-[#B88E2F] transition-colors font-medium flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#B88E2F] transition-all mr-0 group-hover:mr-2"></span>
                  Help Center
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 flex flex-col  md:items-start">
            <h4 className="text-lg font-bold text-gray-900 mb-3 relative">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.google.com/maps/place/Padmavati+Marketing/@12.9377152,77.5586462,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start text-gray-600 hover:text-[#B88E2F] transition-colors group"
                >
                  <HiLocationMarker className="w-5 h-5 mt-1 mr-3 flex-shrink-0 text-[#B88E2F]" />
                  <span className="text-sm leading-relaxed">
                    1st Floor, Padmavati Marketing,<br />
                    Ashok Nagar, Banashankari,<br />
                    Bengaluru - 560050, India
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:urbanfest.help@gmail.com"
                  className="flex  text-gray-600 hover:text-[#B88E2F] transition-colors group"
                >
                  <HiMail className="w-5 h-5 mr-3 flex-shrink-0 text-[#B88E2F]" />
                  <span className="text-sm"> urbanfest.help@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 flex flex-col  md:items-start">
            <h4 className="text-lg font-bold text-gray-900 mb-3 relative ">
              Newsletter
            </h4>

            {!hasSubscribed ? (
              <div className="w-full max-w-sm">
                <p className="text-gray-600 text-sm mb-4 text-center md:text-left">
                  Subscribe to get updates on latest products and exclusive offers.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#B88E2F] text-white py-3  font-semibold hover:bg-[#A77A29] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex  justify-center"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 tracking-wide border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'SUBSCRIBE'
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="w-full max-w-sm bg-green-50 border border-green-200 rounded-lg p-2">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="font-semibold text-green-900 mb-1">Successfully Subscribed!</h5>
  
                  </div>
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-left">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/bmsce.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#A77A29] transition-colors"
                >
                  <FaSquareInstagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/shreyash-sinha-1a87b1247/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#A77A29] transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://x.com/itflame0001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#A77A29] transition-colors"
                >
                  <BsTwitterX size={22} />
                </a>
                <a
                  href="https://github.com/shreyashSinha1208"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#A77A29] transition-colors"
                >
                  <FaGithub size={24} />
                </a>
              </div>
            </div>
          </div >
        </div >
      </div >

      {/* Bottom Bar */}
      < div className="border-t border-gray-300" >
        <div className="max-w-7xl mx-auto lg:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center  gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © 2024 <span className="font-semibold text-[#B88E2F]">UrbanFest</span>. All rights reserved.
            </p>
            <div className="flex gap-2 text-sm">
              <a href="/privacy" className="text-gray-600 hover:text-[#B88E2F] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-[#B88E2F] transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="text-gray-600 hover:text-[#B88E2F] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div >
    </footer >
  );
};

export default Footer;