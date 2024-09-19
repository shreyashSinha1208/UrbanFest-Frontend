import { useAuth } from '../AuthContext';
import Logo from '../assets/Logo.png';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { SiMongodb, SiExpress, } from "react-icons/si";
import { FaNodeJs, FaReact } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { useState } from 'react';
import { RiTailwindCssFill } from "react-icons/ri";

const Footer = () => {


          const { user, logout } = useAuth();
          const [email, setEmail] = useState(user?.email);
          const [hasSubscribed, sethasSubscribed] = useState(false);

          const [message, setMessage] = useState('');

          const handleSubmit = async (e) => {

                    e.preventDefault();
                    try {
                              sethasSubscribed(true);
                              const response = await axios.post('https://urbanfest.onrender.com/subscription', { email }, { withCredentials: true });
                              setMessage('Thank you for subscribing!');
                              setEmail('');
                    } catch (error) {
                              setMessage('There was an error. Please try again.');
                    }
          };
          return (
                    <footer className="w-full bg-[#FCF8F3] pb-14 font-inter">
                              <div className="mx-20 pt-10 max-w-7xl">
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-center md:text-left">

                                                  <div className="flex flex-col items-center md:items-center">
                                                            <a href="/" className="flex items-center mb-4">
                                                                      <img src={Logo} alt="Logo-img" className="w-16 h-12" />
                                                                      <p className="text-3xl mt-4 font-extrabold text-[#B88E2F] tracking-tighter ml-4">
                                                                                UrbanFest
                                                                      </p>
                                                            </a>
                                                            <span className="text-lg text-center tracking-tighter text-gray-500">
                                                                      © <a href="/">UrbanFest</a> 2024, <br /> All rights reserved.
                                                            </span>
                                                          
                                                            <div className="flex items-center mt-2">
                                                                      <SiMongodb size={40} className='ml-2 text-[#417E38]' />
                                                                      <SiExpress size={40} className='ml-2' />
                                                                      <FaReact size={40} className='ml-2 text-[#58C4DC]' />
                                                                      <FaNodeJs size={40} className='ml-2 text-[#417E38]' />
                                                                      <RiTailwindCssFill size={40} className='ml-2 text-[#38BDF8]' />

                                                            </div>
                                                  </div>

                                                  <div className="flex flex-col items-center md:items-center">
                                                            <h4 className="text-xl font-semibold text-gray-800 my-4 tracking-tighter">Registered Office : </h4>
                                                            <a href='https://www.google.com/maps/place/Padmavati+Marketing/@12.9377152,77.5586462,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae3e20adf0ef83:0x7cf0afa2012a22c0!8m2!3d12.9377152!4d77.5612211!16s%2Fg%2F11t4kgvzwk?entry=ttu&g_ep=EgoyMDI0MDkwNC4wIKXMDSoASAFQAw%3D%3D'
                                                                      className="text-lg text-center cursor-pointer tracking-tighter text-gray-500"
                                                                      target='_blank'>
                                                                      1st Floor, Padmavati Marketing, <br /> Ashok Nagar,
                                                                      <br />
                                                                      Banashankari 1st Stage, Bengaluru - 560019,
                                                                      <br />
                                                                      India
                                                            </a>
                                                  </div>
                                                  <div className="flex flex-col items-center md:items-center">
                                                            <h4 className="text-xl font-semibold text-gray-800 my-4 tracking-tighter">More About Us</h4>
                                                            <ul className="text-lg flex flex-col gap-2">
                                                                      <li><a href="/about" target='_blank' className="text-gray-600 tracking-tighter hover:text-gray-900 font-medium">About</a></li>
                                                                      <li><a href="" className="text-gray-600 tracking-tighter hover:text-gray-900 font-medium">Help</a></li>
                                                                      <li><a href="/blogs" className="text-gray-600 tracking-tighter hover:text-gray-900 font-medium">Blogs</a></li>
                                                                      <li><a href="mailto:shreyash.cs22@bmsce.ac.in" target='_blank' className="text-gray-600 tracking-tighter hover:text-gray-900 font-medium">Email Us</a></li>
                                                            </ul>
                                                  </div>

                                                  {/* Column 4: Newsletter Subscription */}
                                                  <div className="flex flex-col items-center md:items-center">

                                                            {!hasSubscribed && <div>
                                                                      <h4 className="text-xl font-semibold text-center text-gray-800 my-4 tracking-tighter">Subscribe to our Newsletter</h4>

                                                                      <form className="flex flex-col gap-4">
                                                                                <input
                                                                                          onChange={(e) => setEmail(e.target.value)}
                                                                                          value={email}
                                                                                          type="email"
                                                                                          placeholder="Your email address"
                                                                                          className="p-2 border tracking-tighter border-gray-300 rounded-md text-gray-800"
                                                                                          required
                                                                                />
                                                                                <button
                                                                                          type="submit"
                                                                                          className="bg-[#B88E2F] tracking-tighter text-white py-2 px-4 rounded-md font-medium hover:bg-[#A77A29] transition duration-300"
                                                                                          onClick={handleSubmit}
                                                                                >
                                                                                          Subscribe
                                                                                </button>
                                                                      </form>
                                                            </div>
                                                            }
                                                            {hasSubscribed && <div>
                                                                      <p className="text-lg mt-10 text-center tracking-tighter text-gray-500">
                                                                                Thank you for Subscribing to our Newsletter. You will get updates on latest news and offers.
                                                                      </p>
                                                            </div>
                                                            }

                                                            <div className="flex mt-6 space-x-4">
                                                                      <a href="https://www.instagram.com/bmsce.official/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#B88E2F] transition transform hover:scale-105 duration-300">
                                                                                <FaSquareInstagram size={28} />
                                                                      </a>
                                                                      <a href="https://www.linkedin.com/in/shreyash-sinha-1a87b1247/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#B88E2F] transition transform hover:scale-105 duration-300">
                                                                                <FaLinkedin size={28} />
                                                                      </a>
                                                                      <a href="https://x.com/itflame0001" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#B88E2F] transition transform hover:scale-105 duration-300">
                                                                                <BsTwitterX size={24} />
                                                                      </a>
                                                                      <a href="https://www.facebook.com/people/Kumar-Rajiv-Nayan/pfbid02KU7oriNz63SQmbgYzATaE6ARZzJ1agtWmrDhkkapzGkeEDC3p4xFKEbfyY8a5AGul/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#B88E2F] transition transform hover:scale-105 duration-300">
                                                                                <FaFacebook size={28} />
                                                                      </a>
                                                            </div>

                                                  </div>
                                        </div>

                              </div>
                    </footer>
          );
}

export default Footer;