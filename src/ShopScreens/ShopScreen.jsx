import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import CategorySection from './CategorySection';
import DummySection from '../DummySections/DummySection';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function ShopScreen() {
          const [categories, setCategories] = useState([]);
          const [products, setProducts] = useState({});
          const [wishlist, setWishlist] = useState([]);
          const { user } = useAuth();
          const [loading, setIsLoading] = useState(true);
          const navigate = useNavigate();

          const token = localStorage.getItem('authToken');

          useEffect(() => {
                    if (location.hash) {
                              const el = document.querySelector(location.hash);
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
          }, [location]);


          useEffect(() => {
                    const fetchProducts = async () => {
                              setIsLoading(true);

                              try {
                                        const response = await axios.get('https://urbanfest.onrender.com/products', {
                                                  headers: { Authorization: `Bearer ${token}` },
                                                  withCredentials: true
                                        });

                                        const allProducts = response.data;
                                        const categorizedProducts = {};

                                        allProducts.forEach(product => {
                                                  if (!categorizedProducts[product.category]) {
                                                            categorizedProducts[product.category] = [];
                                                  }
                                                  categorizedProducts[product.category].push(product);
                                        });

                                        setCategories(Object.keys(categorizedProducts));
                                        setProducts(categorizedProducts);
                              } catch (error) {
                                        console.log('Error fetching products:', error);
                              } finally {
                                        setIsLoading(false);
                              }
                    };

                    fetchProducts();
          }, []);


          useEffect(() => {
                    const fetchWishlist = async () => {
                              if (!user || !token) {
                                        setWishlist([]);
                                        return;
                              }
                              try {
                                        const response = await axios.get('https://urbanfest.onrender.com/wishlist', {
                                                  headers: { Authorization: `Bearer ${token}` },
                                                  withCredentials: true
                                        });
                                        setWishlist(Array.isArray(response.data) ? response.data : []);
                              } catch (error) {
                                        console.log('Error fetching wishlist:', error);
                                        setWishlist([]);
                              }
                    };

                    fetchWishlist();
          }, []);


          const showProduct = (id) => {
                    navigate(`/products/show/${id}`);
          };


          return (
                    <div className="lg:px-20 px-5 bg-white py-12">
                              <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="header-section text-center mb-20"
                              >
                                        <h1 className="text-3xl lg:text-4xl text-gray-800 tracking-tighter font-extrabold">
                                                  Explore our <span className='text-[#B88E2F]'>range.</span>
                                        </h1>
                                        <p className="text-lg text-gray-500 mt-4 tracking-tighter font-medium">
                                                  Unveil <span className='text-[#B88E2F]'> premium craftsmanship </span>across distinct design categories.
                                        </p>
                              </motion.div>

                              {loading ? (
                                        <DummySection />
                              ) : (
                                        categories.map((category, index) => (
                                                  <CategorySection
                                                            key={category}
                                                            category={category}
                                                            products={products[category] || []}
                                                            showProduct={showProduct}
                                                            wishlist={wishlist}
                                                            setWishlist={setWishlist}
                                                            user={user}

                                                            token={token}
                                                            index={index}
                                                  />
                                        ))
                              )}
                    </div>
          );
}