import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyWishList from '../assets/EmptyWishList.png';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { IoIosHeart } from "react-icons/io";
import { useAuth } from '../AuthContext';

export default function Wishlist() {
        const [wishlist, setWishlist] = useState([]);
        const [loading, setLoading] = useState(true);
        const { user, logout } = useAuth();
        const navigate = useNavigate();
        const token = localStorage.getItem('authToken');

        useEffect(() => {
                if (!user) {
                        navigate('/login',
                                { state: { message: 'Please login to view your wishlist' } });
                        return;
                }
                axios.get('https://urbanfest.onrender.com/wishlist', {
                        headers: {
                                Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
                        },
                        withCredentials: true,
                })
                        .then((response) => {
                                setWishlist(response.data);
                        })
                        .catch((error) => {
                                console.log(error);
                        })
                        .finally(() => {
                                setTimeout(() => {
                                        setLoading(false);
                                }, 500);
                        });
        }, []);

        const showProduct = (id) => {
                navigate(`/products/show/${id}`);
        };

        const removeFromWishlist = async (product) => {
                try {
                        await axios.delete(`https://urbanfest.onrender.com/wishlist/${product._id}`, {
                                headers: {
                                        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
                                },
                                withCredentials: true,
                        });
                        setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== product._id));
                } catch (error) {
                        console.error('Error removing from wishlist:', error);
                }
        };

        if (loading) {
                return <div><LoadingScreen /></div>; // Replace with your loading component if any.
        }

        return (
                <div className="lg:mx-20 mx-10 my-0 mb-20 font-inter">
                        <div className="header-section text-center mb-20">
                                <h1 className="text-3xl text-gray-700 mt-20 font-extrabold">My Wishlist</h1>
                                <h1 className="text-xl text-text-gray-600 mt-5 font-medium">
                                        Your favourites are residing here.
                                </h1>
                        </div>

                        {wishlist.length === 0 ? (
                                <div className="flex flex-col items-center justify-start h-screen">
                                        <div className="text-center text-gray-500 mb-4">Your wishlist is empty.</div>
                                        <img src={EmptyWishList} className="h-60 w-60" alt="EmptyWishList" />
                                </div>
                        ) : (
                                <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
                                        {wishlist.map((product) => (
                                                <div
                                                        onClick={() => showProduct(product.itemid)}
                                                        className="flex justify-center cursor-pointer lg:mt-0 mt-5 transition-transform transform hover:scale-105 duration-500 relative"
                                                        key={product._id}
                                                >
                                                        <div className="bg-gray-100 h-96 rounded-xl">
                                                                <img
                                                                        src={product.img}
                                                                        className="rounded-t-xl h-[70%] w-full"
                                                                        alt={product.name}
                                                                />
                                                                <div className="card-text p-4">
                                                                        <p className="text-xl text-gray-700 font-semibold tracking-tighter mb-1">
                                                                                {product.name}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500 mb-1">
                                                                                {product.description.substring(0, 25)}...
                                                                        </p>
                                                                        <p className="text-lg font-bold mb-1 text-gray-700 tracking-tighter">
                                                                                ₹ {product.price.toLocaleString('en-IN')} &nbsp;
                                                                                <span className="line-through text-base text-gray-500 tracking-tighter">
                                                                                        ₹ {product.oldPrice.toLocaleString('en-IN')}
                                                                                </span>
                                                                        </p>
                                                                </div>
                                                                <div
                                                                        className="absolute top-3 right-3 z-50 text-2xl cursor-pointer"
                                                                        onClick={(e) => {
                                                                                e.stopPropagation(); // Prevent triggering the showProduct function
                                                                                removeFromWishlist(product);
                                                                        }}
                                                                >
                                                                        <IoIosHeart className='text-red-500' />
                                                                </div>
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        )}
                </div>
        );
}
