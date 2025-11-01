import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function Hero() {
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setMessage(location.state.message);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [location.state]);

    useEffect(() => {
        if (message) {
            setShowNotification(true);
            const timer = setTimeout(() => {
                setShowNotification(false);
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    return (
        <div className="relative bg-white overflow-hidden items-center lg:flex hidden">
            {/* Decorative Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-32 -left-32 w-64 h-64 border-[40px] border-[#B88E2F] opacity-5 rounded-full"
                />

                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 left-[15%] w-16 h-16 bg-[#B88E2F] opacity-10 rounded-full"
                />

                <motion.div
                    animate={{
                        rotate: [0, -360]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-20 -right-20 w-96 h-96 border-[50px] border-[#B88E2F] opacity-5 rounded-full"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-20 right-[15%] w-32 h-32 bg-[#B88E2F] opacity-8 rounded-full blur-3xl"
                />
            </div>
            {showNotification && (
                <motion.div
                    initial={{ y: -100, opacity: 0, x: '-50%' }}
                    animate={{ y: 0, opacity: 1, x: '-50%' }}
                    exit={{ y: -100, opacity: 0, x: '-50%' }}
                    transition={{ duration: 0.3 }}
                    className="fixed hidden lg:block top-16 left-1/2 bg-[#B88E2F] rounded-lg text-sm text-white text-center px-4 py-2 font-inter z-50"
                >
                    {message}
                </motion.div>
            )}
            <div className="relative z-10 w-full lg:py-0">
                <div className="w-full px-6 md:px-10 lg:px-20 max-w-[1600px] mx-auto">
                    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="space-y-6 order-2 lg:order-1 relative"
                        >
                            <motion.div custom={0} variants={fadeInUp}>
                                <span className="text-xs tracking-wider text-gray-500 font-semibold uppercase">
                                    New Collection 2026
                                </span>
                            </motion.div>

                            <motion.h1
                                custom={1}
                                variants={fadeInUp}
                                className="text-5xl sm:text-6xl font-extrabold text-gray-700 leading-tight tracking-tighter"
                            >
                                Discover Our
                                <span className="block">New <span className="text-[#B88E2F]">Collection.</span></span>
                            </motion.h1>

                            <motion.p
                                custom={2}
                                variants={fadeInUp}
                                className="text-base md:text-lg tracking-tighter text-gray-500 max-w-md leading-relaxed"
                            >
                                Elevate your living space with our curated selection of premium furniture pieces crafted for modern living.
                            </motion.p>

                            <motion.div
                                custom={3}
                                variants={fadeInUp}
                                className="flex flex-wrap gap-4 pt-4"
                            >
                                <Link to="/shop">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-[#B88E2F] text-white px-8 py-4 font-semibold text-sm flex items-center gap-3 hover:bg-[#a07a28] transition-colors"
                                    >
                                        Explore Collection
                                        <FaArrowRight className="text-xs" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Minimal Grid */}
                        {/* Right Side - Minimal Grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="relative h-[500px] order-1 lg:order-2 py-8"
                        >
                            <div className="grid grid-cols-2 gap-4 h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                    className="relative rounded-2xl overflow-hidden"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=1200&fit=crop&q=85"
                                        alt="Furniture 1"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                <div className="flex flex-col gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                        className="relative rounded-2xl overflow-hidden h-[238px] "
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop&q=85"
                                            alt="Furniture 2"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        transition={{ delay: 0.8, duration: 0.6 }}
                                        className="relative rounded-2xl overflow-hidden h-[238px]"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=85"
                                            alt="Furniture 3"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}