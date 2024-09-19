import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import CategorySection from './CategorySection';
import DummySection from '../DummySections/DummySection';

export default function ShopScreen() {
          const [categories, setCategories] = useState([]);
          const [products, setProducts] = useState({});
          const [wishlist, setWishlist] = useState([]);
          const { user } = useAuth();
          const [loading, setIsLoading] = useState(true);
          const token = localStorage.getItem('authToken');
          const navigate = useNavigate();

          useEffect(() => {
                    setIsLoading(true);
                    axios.get('https://urbanfest.onrender.com/products', {
                              headers: { Authorization: `Bearer ${token}` },
                              withCredentials: true
                    })
                              .then(response => {
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
                                        setIsLoading(false);
                              })
                              .catch(error => console.log(error));

                    // Fetch wishlist items
                    axios.get('https://urbanfest.onrender.com/wishlist', {
                              headers: { Authorization: `Bearer ${token}` },
                              withCredentials: true
                    })
                              .then(response => {
                                        if (Array.isArray(response.data)) {
                                                  setWishlist(response.data);
                                        } else {
                                                  setWishlist([]);
                                        }
                              })
                              .catch(error => console.log(error));
          }, [token]);

          const showProduct = (id) => {
                    navigate(`/products/show/${id}`);
          };

          return (
                    <div className="lg:mx-20 mx-10 my-0 mb-20 font-inter">
                              <div className="header-section text-center mb-20">
                                        <h1 className="text-3xl text-gray-700 mt-20 tracking-tight font-extrabold">Shop by Category.</h1>
                                        <h1 className="text-xl text-text-gray-600 mt-5 tracking-tight font-medium">
                                                  Explore different fashion based on Category.
                                        </h1>
                              </div>

                              {loading ? <DummySection /> :
                                        categories.map((category, index) => (
                                                  <CategorySection
                                                            key={index}
                                                            category={category}
                                                            products={products[category]}
                                                            showProduct={showProduct}
                                                            wishlist={wishlist}
                                                            user={user}
                                                            token={token}
                                                            setWishlist={setWishlist}
                                                  />
                                        ))}
                    </div>
          );
}
