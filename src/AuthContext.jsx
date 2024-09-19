import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        // Load user and token from localStorage on initial render
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const login = (userData, token) => {
        const loginTime = new Date().getTime(); // Get the current timestamp
        const userWithTime = { ...userData, loginTime }; // Add the timestamp to the user data
        setUser(userWithTime);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userWithTime)); // Store user with timestamp in localStorage
        localStorage.setItem('authToken', token); // Store token in localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set default authorization header
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user'); // Remove user from localStorage
        localStorage.removeItem('authToken'); // Remove token from localStorage
        delete axios.defaults.headers.common['Authorization']; // Remove default authorization header
    };

    const updateAddress = (newAddress) => {
        const updatedUser = { ...user, address: newAddress };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update user in localStorage
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateAddress }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
