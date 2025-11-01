// UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);
          const token = localStorage.getItem('authToken');

          useEffect(() => {
                    const fetchCurrentUser = async () => {
                              try {
                                        setLoading(true);
                                        const response = await axios.get('http://localhost:5000/user',
                                                  {
                                                            headers: { Authorization: `Bearer ${token}`, },
                                                            withCredentials: true
                                                  });
                                        setUser(response.data.user);
                              } catch (error) {
                                        console.log('Failed to fetch user:', error);
                                        setUser(null);
                              } finally {
                                        setLoading(false);
                              }
                    };

                    fetchCurrentUser();
          }, []);

          return (
                    <UserContext.Provider value={{ user, setUser, loading }}>
                              {children}
                    </UserContext.Provider>
          );
};
