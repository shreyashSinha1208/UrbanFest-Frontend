import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroImage from '../assets/Hero-Image.png';
import HeroImage2 from '../assets/Hero-Image2.png';
import HeroImage3 from '../assets/Hero-Image3.png';
import HeroImage4 from '../assets/Hero-Image4.jpg';
import HeroImage5 from '../assets/Hero-Image5.jpg';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Hero() {
    const location = useLocation();
    const { state } = location;
    const email = state?.email;
    const message = state?.message;
    const imageUrl = [HeroImage, HeroImage2, HeroImage3, HeroImage4, HeroImage5];
    const [opacity, setOpacity] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    useEffect(() => {
        if (message) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 2000); 
            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity(0);
            setTimeout(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % imageUrl.length);  // Change image
                setOpacity(1);
            }, 800);
        }, 2500);

        return () => clearInterval(interval);
    }, [imageUrl.length]);

    return (
        <div>
            {showNotification && (
                <div
                    className="fixed font-inter top-28 left-1/2 transform -translate-x-1/2 bg-[#B88E2F] text-white px-6 py-3 shadow-lg z-50"
                >
                    {message}
                </div>
            )}

            <div className="mt-0 font-inter">
                <div className="hero-Image h-[500px] w-full relative">
                    <img
                        src={imageUrl[imageIndex]}
                        className="hidden lg:block w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100"
                        alt="Hero-Image"
                        style={{ opacity }}
                    />
                </div>

                <div className="h-80 lg:block hidden p-10 w-96 rounded-lg left-[62%] bg-[#FFF3E3] bottom-[10%] absolute z-40">
                    <p className="tracking-widest font-bold mb-3">New Arrival</p>
                    <h1 className="font-extrabold text-4xl mb-3 text-[#B88E2F]">
                        Discover Our <br /> New Collection.
                    </h1>
                    <p className="text-sm mb-10">
                        A sleek, handcrafted wooden chair perfect to add style to any space.
                    </p>
                    <Link to="/shop">
                        <button
                            type="submit"
                            className="bg-[#B88E2F] h-12 w-36 hover:bg-white text-white hover:text-[#B88E2F] text-[12px] font-semibold transition-colors duration-300"
                        >
                            BUY NOW <FaArrowRight className="inline ml-2" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
