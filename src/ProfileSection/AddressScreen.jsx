import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const AddressScreen = () => {
          const { updateAddress } = useAuth();
          const [addressSearch, setAddressSearch] = useState('');
          const [suggestions, setSuggestions] = useState([]);
          const [selectedAddress, setSelectedAddress] = useState(localStorage.getItem('address') || '');

          const handleAddressSearch = async (e) => {
                    const searchText = e.target.value;
                    setAddressSearch(searchText);

                    if (searchText.length > 2) {
                              try {
                                        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&apiKey=ba11ae8afd394ca7b4adac392a182f24`);
                                        const data = await response.json();
                                        setSuggestions(data.features || []);
                              } catch (error) {
                                        console.error('Error fetching suggestions:', error);
                              }
                    } else {
                              setSuggestions([]);
                    }
          };

          const handleSelectAddress = (address) => {
                    setSelectedAddress(address);
                    setAddressSearch(address);
                    setSuggestions([]);
          };

          const handleSaveAddress = () => {
                    localStorage.setItem('address', selectedAddress);
                    updateAddress(selectedAddress);
          };

          return (
                    <div className="bg-white rounded-lg p-6 border ml-5">
                              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Address</h2>
                              <input
                                        type="text"
                                        value={addressSearch}
                                        onChange={handleAddressSearch}
                                        className="w-full p-3 mt-3 border rounded-md"
                                        placeholder="Search for your address..."
                              />
                              {suggestions.length > 0 && (
                                        <ul className="border border-gray-300 rounded-md max-h-20 overflow-y-auto">
                                                  {suggestions.map((suggestion) => (
                                                            <li
                                                                      key={suggestion.properties.formatted}
                                                                      className="p-3 text-[#B88E2F] tracking-tight cursor-pointer hover:bg-gray-100"
                                                                      onClick={() => handleSelectAddress(suggestion.properties.formatted)}
                                                            >
                                                                      {suggestion.properties.formatted}
                                                            </li>
                                                  ))}
                                        </ul>
                              )}
                              <div className="mt-10">
                                        <strong className="text-gray-600">Selected Address:</strong>
                                        <p className="text-[#B88E2F] font-bold">{selectedAddress || 'No address selected'}</p>
                                        <button
                                                  className="mt-2 py-2 px-4 bg-[#B88E2F] text-white font-semibold rounded-lg hover:bg-blue-600"
                                                  onClick={handleSaveAddress}
                                        >
                                                  Save Address
                                        </button>
                              </div>
                    </div>
          );
};

export default AddressScreen;