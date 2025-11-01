import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import BlankProfile from '../assets/Blank-profile.jpg';
import PersonalInfo from './PersonalInfo';
import OrderScreen from './OrderScreen';
import AddressScreen from './AddressScreen';
import { ImSwitch } from "react-icons/im";
import { FiUser, FiMapPin, FiPackage, FiCamera } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('personalInfo');
    const [imageError, setImageError] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef(null);
    const { user, logout, updateUser } = useAuth();

    const { section } = useParams();

    useEffect(() => {
        if (section === 'personal') setActiveTab('personalInfo');
        else if (section === 'address') setActiveTab('address');
        else setActiveTab('orders');
    }, [section]);


    const handleLogout = async () => {
        await logout();
        navigate('/', {state: { message: 'Logged out successfully' }, replace: true });
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            setLoading(true);
            console.log('Updating user with data:', updatedUser);
            const response = await axios.put(`https://urbanfest.onrender.com/update/${user._id}`, updatedUser, { withCredentials: true });
            updateUser(response.data.user);
            console.log(user)
            setLoading(false);
        } catch (error) {
            console.log('Failed to update user data:', error);
            setLoading(false);
        }
    };


    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;


        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, WebP)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploadingImage(true);
        const formData = new FormData();
        formData.append('profileImage', file);
        console.log(file);

        try {
            const response = await axios.put(
                `  https://urbanfest.onrender.com/update/${user._id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            updateUser(response.data.user);
            setImageError(false);
        } catch (error) {
            console.log('Failed to upload image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploadingImage(false);
        }
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        handleLogout();
    };

    useEffect(() => {
        if (user == null) {
            navigate('/login', { state: { message: 'Please login to view your profile' }, replace: true });
            return;
        }
    }, [user, navigate]);

    const menuItems = [
        {
            id: 'personalInfo',
            label: 'Personal Info',
            icon: <FiUser size={18} />,
            path: '/profile/personal'
        },
        {
            id: 'address',
            label: 'My Addresses',
            icon: <FiMapPin size={18} />,
            path: '/profile/address'
        },
        {
            id: 'orders',
            label: 'My Orders',
            icon: <FiPackage size={18} />,
            path: '/profile/orders'
        }
    ];

    return (
        <div className="">
            {user && (
                <div className="flex flex-col lg:px-20 px-5 bg-white py-20 md:flex-row pt-10  gap-6">
                    {/* Sidebar */}
                    <aside className="bg-white md:block hidden rounded-xl md:w-2/4 lg:w-1/4 border border-gray-200 h-fit md:sticky md:top-24">

                        {/* Profile Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex justify-center items-center mb-4">
                                <div className="relative group">
                                    <img
                                        src={!imageError && user?.picture ? user.picture.toString() : BlankProfile}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full border object-cover"
                                        onError={(e) => {
                                            setImageError(true);
                                            e.target.src = BlankProfile;
                                        }}
                                    />
                                    {uploadingImage && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}
                                    <button
                                        onClick={handleImageClick}
                                        className="absolute bottom-0 right-0 w-8 h-8 bg-[#B88E2F] text-white rounded-full flex items-center justify-center hover:bg-[#9a7526] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
                                        disabled={uploadingImage}
                                    >
                                        <FiCamera size={14} />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                            <h2 className="text-xl md:text-lg font-bold text-center mb-1 tracking-tight text-gray-800">
                                {user.name || user.username}
                            </h2>
                            <p className="text-sm text-gray-500 text-center tracking-tight truncate px-2">
                                {user.email}
                            </p>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="p-4">
                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={item.path}
                                        className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 ${activeTab === item.id
                                            ? 'bg-[#B88E2F] text-white'
                                            : 'text-gray-700 hover:bg-[#F9F1E7] hover:text-[#B88E2F]'
                                            }`}
                                        onClick={() => setActiveTab(item.id)}
                                    >
                                        <span className={activeTab === item.id ? 'text-white' : 'text-[#B88E2F]'}>
                                            {item.icon}
                                        </span>
                                        <span className="tracking-tight">{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Logout Button */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <button
                                    className="w-full flex items-center justify-center gap-2 p-3 tracking-tight bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
                                    onClick={() => setShowLogoutConfirm(true)}
                                >
                                    <span>Logout</span>
                                    <ImSwitch className="text-lg" />
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full md:w-3/4">
                        {loading ? (
                            <LoadingScreen />
                        ) : (
                            <div className="space-y-6">
                                {/* Tab Content */}
                                {activeTab === 'personalInfo' && <PersonalInfo user={user} onSave={handleUpdateUser} />}
                                {activeTab === 'address' && <AddressScreen user={user} onSaveAddress={handleUpdateUser} />}
                                {activeTab === 'orders' && <OrderScreen user={user} />}
                            </div>
                        )}
                    </main>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-60 border backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div
                        className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300 animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with Icon */}
                        <div className="p-6 pb-4">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <ImSwitch className="text-3xl text-red-600" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center tracking-tighter">
                                Confirm Logout
                            </h3>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-6 pb-6">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <ImSwitch className="text-lg" />
                                    <span>Yes, Logout</span>
                                </button>
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 px-5 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 active:scale-95 transition-all duration-200 border border-gray-300"
                                >
                                    Stay Logged In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ProfileScreen;