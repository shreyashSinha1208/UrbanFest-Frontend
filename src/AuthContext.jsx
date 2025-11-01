import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);


    const login = (userData, token) => {
        const loginTime = new Date().getTime();
        const userWithTime = { ...userData, loginTime };
        setUser(userWithTime);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userWithTime));
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };


    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
    };

    const updateUser = (freshUserData) => {
        const cleanUser = {
            ...freshUserData,
            loginTime: user?.loginTime || new Date().getTime()
        };
        localStorage.removeItem('user'); 
        setUser(cleanUser);
        localStorage.setItem('user', JSON.stringify(cleanUser));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
