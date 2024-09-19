import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import LoginImage from '../assets/LoginImage.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function SignUpScreen() {

          const [username, setUsername] = useState('');
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [errorMessage, setErrorMessage] = useState(''); // State for error messages
          const [googleLoading, setgoogleLoading] = useState(false);
          const [emaiLoading, setEmailLoading] = useState(false);
          const [showNotification, setShowNotification] = useState(false);// State for loader
          const { login } = useAuth();
          const navigate = useNavigate();

          const googlePress = () => {
                    setgoogleLoading(true);
                    googleLogin();
          };

          const googleLogin = useGoogleLogin({
                    onSuccess: async (tokenResponse) => {
                              try {
                                        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                                                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                                        }, { withCredentials: true });

                                        const response = await axios.post('https://urbanfest.onrender.com/login', {
                                                  sub: res.data.sub,
                                                  name: res.data.name,
                                                  email: res.data.email,
                                                  picture: res.data.picture,
                                                  token: tokenResponse.access_token // Send token to the backend
                                        }, { withCredentials: true });

                                        const { user, token } = response.data;
                                        login(user, token);
                                        navigate("/", { state: { message: `Logged in as ${response.data.user.email}` } });
                              } catch (err) {
                                        console.log("Error detected:", err);
                              } finally {
                                        setgoogleLoading(false);
                              }
                    }
          });


          const showErrorNotification = (msg) => {
                    setErrorMessage(msg);
                    setShowNotification(true);
                    setTimeout(() => {
                              setShowNotification(false);
                    }, 3000); // Notification disappears after 3 seconds
          };

          const handleSignUp = async () => {


                    if (!username || !email || !password) {
                              showErrorNotification("Incomplete credentials. Please fill all fields.");
                              return;
                    }
                    if (!email.includes('@')) {
                              showErrorNotification("Invalid email format. Must contain '@'.");
                              return;
                    }
                    if (password.length < 8) {
                              showErrorNotification("Password must be at least 8 characters!");
                              return;
                    }
                    setEmailLoading(true);
                    try {
                              const response = await axios.post('https://urbanfest.onrender.com/login', {
                                        name: username,
                                        email: email,
                                        password: password,
                              }, { withCredentials: true });
                              const { user, token } = response.data;
                              login(user, token);
                              console.log('User data:', user);

                              navigate("/", { state: { message: `Signed up as ${user.email}` } });
                    } catch (err) {
                              console.error("Error detected: ", err.response ? err.response.data : err.message);
                              setErrorMessage('Sign-up failed. Please try again.');
                    } finally {
                              setEmailLoading(false);
                    }
          };


          return (
                    <div>

                              {showNotification && (
                                        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-[#B88E2F] text-white px-4 py-2 font-inter z-50">
                                                  {errorMessage}
                                        </div>
                              )}
                              <div className="grid grid-cols-1 mx-5 lg:mx-0 lg:grid-cols-2 gap-0 font-inter">
                                        <div className="loginScreen">
                                                  <div className="min-h-screen pt-16 text-gray-900 flex lg:items-start justify-center ">
                                                            <div className="max-w-md w-full bg-white sm:rounded-lglg:pr-7">
                                                                      <div className="logo-img mb-5 h-12 w-16">
                                                                                <img src={Logo} alt="Logo-Image" />
                                                                      </div>
                                                                      <h1 className="text-2xl xl:text-3xl mb-5 font-bold tracking-tighter">
                                                                                Sign Up to UrbanFest
                                                                      </h1>

                                                                      <div className="space-y-6">
                                                                                <div className="space-y-5">
                                                                                          <input
                                                                                                    className="w-full px-4 py-[8px] shadow-sm border-[2px] border-gray-200 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none focus:border-[#B88E2F]"
                                                                                                    type="text"
                                                                                                    placeholder="Username"
                                                                                                    value={username}
                                                                                                    onChange={(e) => setUsername(e.target.value)} />
                                                                                          <input
                                                                                                    className="w-full px-4 py-[8px] shadow-sm border-[2px] border-gray-200 rounded-lg font-medium placeholder-gray-500 text-sm focus:outline-none focus:border-[#B88E2F]"
                                                                                                    type="email"
                                                                                                    placeholder="Email"
                                                                                                    value={email}
                                                                                                    onChange={(e) => setEmail(e.target.value)} />
                                                                                          <input
                                                                                                    className="w-full px-4 py-[8px] shadow-sm rounded-lg border-2 border-gray-200  font-medium placeholder-gray-500 text-sm focus:outline-none focus:border-[#B88E2F]"
                                                                                                    type="password"
                                                                                                    placeholder="Password"
                                                                                                    value={password}
                                                                                                    onChange={(e) => setPassword(e.target.value)} />

                                                                                          <button
                                                                                                    onClick={handleSignUp}
                                                                                                    className="mt-5 tracking-wide font-semibold bg-[#B88E2F] text-gray-100 w-full py-2 rounded-lg hover:bg-[#a0740e] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                                                                    {emaiLoading ? (
                                                                                                              <div className='py-1'>
                                                                                                                        <div className="border-4 border-white border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                                                                                                              </div>
                                                                                                    ) : (
                                                                                                              <span className="ml-3 tracking-tighter">Sign In</span>
                                                                                                    )}
                                                                                          </button>

                                                                                          <div className="continue flex justify-between items-center">
                                                                                                    <div><hr className='bg-black w-20 lg:w-40' /></div>
                                                                                                    <div><p className='lg:text-sm font-semibold'>Or continue with</p></div>
                                                                                                    <div><hr className='bg-black w-20 lg:w-40' /></div>
                                                                                          </div>

                                                                                          <button
                                                                                                    onClick={googlePress}
                                                                                                    className="w-full font-bold px-4 py-[3px] shadow-sm rounded-lg border-2 border-gray-300 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:border-[#B88E2F]">
                                                                                                    {googleLoading ? (
                                                                                                              <div className='py-1'>
                                                                                                                        <div className="border-4 border-[#B88E2F] border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
                                                                                                              </div>
                                                                                                    ) : (
                                                                                                              <>
                                                                                                                        <div className="bg-white p-2 rounded-full cursor-pointer">
                                                                                                                                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                                                                                                            <path
                                                                                                                                                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                                                                                                                      fill="#4285f4"
                                                                                                                                            />
                                                                                                                                            <path
                                                                                                                                                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                                                                                                                      fill="#34a853"
                                                                                                                                            />
                                                                                                                                            <path
                                                                                                                                                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                                                                                                                      fill="#fbbc04"
                                                                                                                                            />
                                                                                                                                            <path
                                                                                                                                                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                                                                                                                      fill="#ea4335"
                                                                                                                                            />
                                                                                                                                  </svg>
                                                                                                                        </div>
                                                                                                                        <span className="ml-1">Sign In with Google</span>
                                                                                                              </>
                                                                                                    )}
                                                                                          </button>

                                                                                          <p className="text-xs font-medium text-gray-600 text-center">
                                                                                                    I agree to abide by UrbanFest's Terms of Service and its Privacy Policy.
                                                                                          </p>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>

                                        <div className="loginImage lg:block hidden">
                                                  <img src={LoginImage} style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)' }} className='h-screen object-cover w-full' alt="Login-Image" />
                                        </div>
                              </div>
                    </div>
          )
};
