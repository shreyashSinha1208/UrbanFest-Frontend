import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import BlankProfile from '../assets/Blank-profile.jpg';
import PersonalInfo from './PersonalInfo';
import OrderScreen from './OrderScreen';
import AddressScreen from './AddressScreen';
import { ImSwitch } from "react-icons/im";// Import the AddressScreen component
import axios from 'axios';

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('orders');
   // console.log(user);
    
    



    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            await axios.get('https://urbanfest.onrender.com/logout', { withCredentials: true });
            navigate('/login', { state: { message: 'Logout Successful' } });
        } catch (error) {
            console.error('Error logging out:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user == null) {
            navigate('/login', { state: { message: 'Please login to view your profile' } }, { replace: true }, { withCredentials: true });
            return;
        }
    }, [user, navigate]);



    return (
        <div>
            {user &&
                <div className="flex flex-col lg:mx-20 mx-5 mb-20 md:flex-row mt-10 font-inter">
                    <aside className="bg-[#F9F1E7] shadow-sm rounded-lg md:w-1/4 p-6 h-full">

                        <div className="flex justify-center mb-6">
                            <img
                                src={user?.picture ? user.picture.toString() : BlankProfile}
                                alt="Profile"
                                className="w-24 h-24 rounded-full"
                                onError={(e) => {
                                    e.target.src = BlankProfile; // Fallback image
                                }}
                            />
                        </div>

                        <h2 className="text-xl font-bold text-center mb-4 tracking-tighter text-[#B88E2F]">{user.name || user.username}</h2>
                        <nav className="flex flex-col space-y-4">
                            <Link to="/profile/personal" className={`p-2 rounded-3xl font-semibold hover:bg-[#B88E2F] hover:text-white tracking-tighter text-center ${activeTab === 'personalInfo' ? 'bg-[#B88E2F] text-white' : 'bg-transparent text-[#B88E2F]'}`}>
                                <button
                                    onClick={() => setActiveTab('personalInfo')}
                                >
                                    Personal Info
                                </button>
                            </Link>
                            <Link to='/profile/address' className={`p-2 rounded-3xl font-semibold hover:bg-[#B88E2F] hover:text-white tracking-tighter  text-center ${activeTab === 'address' ? 'bg-[#B88E2F] text-white' : 'bg-transparent text-[#B88E2F]'}`}><button
                                onClick={() => setActiveTab('address')}
                            >
                                Address
                            </button>
                            </Link>
                            <Link to='/profile/orders' className={`p-2 rounded-3xl font-semibold hover:bg-[#B88E2F] hover:text-white tracking-tighter text-center ${activeTab === 'orders' ? 'bg-[#B88E2F] text-white' : 'bg-transparent text-[#B88E2F]'}`}
                            ><button
                                onClick={() => setActiveTab('orders')}
                            >
                                    My Orders
                                </button>
                            </Link>
                            <button
                                className="mt-4 p-2 tracking-tighter bg-[#B88E2F] text-white font-semibold rounded-3xl hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Logout <ImSwitch className='inline ml-2' />
                            </button>
                        </nav>
                    </aside>


                    <main className="w-full md:w-3/4 md:mt-0">
                        {loading ? (
                            <LoadingScreen />
                        ) : (
                            <>
                                {activeTab === 'personalInfo' && <PersonalInfo user={user} />}
                                {activeTab === 'address' && <AddressScreen />}  {/* Render AddressScreen */}
                                {activeTab === 'orders' && <OrderScreen user={user} />}

                                <div className="lg:mt-5 p-6 lg:ml-5  bg-gray-100 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-2 tracking-tighter">Your Shopping Preferences</h3>
                                    <p className="text-gray-700 tracking-tighter">
                                        Here are some personalized recommendations based on your shopping habits. Explore items that match your style and preferences. Keep an eye on deals and discounts tailored just for you.
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="text-gray-700 tracking-tighter">
                                            <span className="font-semibold ">Recent Purchases:</span> <span className='tracking-tighter'>View and track your recent orders and delivery statuses.</span>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-semibold tracking-tighter">Wishlist:</span> <span className='tracking-tighter'>Don't miss out on items you've saved for later. Check if they're on sale!</span>
                                        </li>
                                        <li className="text-gray-700">
                                            <span className="font-semibold tracking-tighter">Recommended for You:</span>  <span className='tracking-tighter'>Explore products that might interest you based on your browsing history.</span>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </main>
                </div>}
        </div>

    );
};

export default ProfileScreen;
