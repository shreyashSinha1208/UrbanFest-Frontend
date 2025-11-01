import React, { useState, useEffect } from 'react';
import { FiMapPin, FiSearch, FiCheck, FiTrash2, FiHome, FiBriefcase } from 'react-icons/fi';

const LOCATIONIQ_TOKEN = 'pk.c755508a4b06e7c9aa69f34532efad3c';

const AddressScreen = ({ user, onSaveAddress }) => {
  const [addressSearch, setAddressSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addressLabel, setAddressLabel] = useState('home');
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (user?.addresses && Array.isArray(user.addresses)) {
      setSavedAddresses(user.addresses);
      const defaultAddr = user.addresses.find(addr => addr.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr.address);
    }
  }, [user]);

  const handleAddressSearch = async (e) => {
    const searchText = e.target.value;
    setAddressSearch(searchText);
    if (searchText.length > 2) {
      try {
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_TOKEN}&q=${encodeURIComponent(searchText)}&limit=5&dedupe=1`
        );
        const data = await response.json();
        setSuggestions(data || []);
      } catch (error) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectAddress = (addressObj) => {
    setSelectedAddress(addressObj.display_name);
    setAddressSearch(addressObj.display_name);
    setSuggestions([]);
    setShowLabelInput(true);
  };

  const handleSaveAddress = () => {
    if (!selectedAddress) return;
    const addressWithLabel = {
      address: selectedAddress,
      label: addressLabel,
      id: Date.now(),
      isDefault: savedAddresses.length === 0
    };
    const updatedAddresses = [...savedAddresses, addressWithLabel];
    if (onSaveAddress) onSaveAddress({ addresses: updatedAddresses });
    setAddressSearch('');
    setShowLabelInput(false);
    setAddressLabel('home');
    setSelectedAddress('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = savedAddresses.filter(addr => addr.id !== addressId);
    if (onSaveAddress) onSaveAddress({ addresses: updatedAddresses });
    const deletedAddress = savedAddresses.find(addr => addr.id === addressId);
    if (selectedAddress === deletedAddress?.address) setSelectedAddress('');
  };

  const handleSetDefault = (address) => {
    const updatedAddresses = savedAddresses.map(addr => ({
      ...addr, isDefault: addr.id === address.id
    }));
    if (onSaveAddress) onSaveAddress({ addresses: updatedAddresses });
    setSelectedAddress(address.address);
  };

  const handleCancelAddAddress = () => {
    setShowLabelInput(false);
    setSelectedAddress('');
    setAddressSearch('');
    setSuggestions([]);
  };

  const getLocation = () => {
    setLoadingLocation(true);
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLoadingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchAddressFromCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLocationError(error.message);
        setLoadingLocation(false);
      }
    );
  };

  const fetchAddressFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_TOKEN}&lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      const formattedAddress = data.display_name;
      if (formattedAddress) {
        setSelectedAddress(formattedAddress);
        setAddressSearch(formattedAddress);
        setShowLabelInput(true);
        setSuggestions([]);
        setLocationError(null);
      } else {
        setLocationError('Unable to fetch address from location');
      }
    } catch {
      setLocationError('Reverse geocoding failed');
    } finally {
      setLoadingLocation(false);
    }
  };

  const getLabelIcon = (label) => {
    switch (label) {
      case 'home': return <FiHome size={16} />;
      case 'work': return <FiBriefcase size={16} />;
      default: return <FiMapPin size={16} />;
    }
  };

  return (
    <div className="bg-white md:rounded-xl md:border md:border-gray-200">
      <div className="md:p-6 md:border-b md:border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-1 md:mb-2 text-center md:text-left px-4 md:px-0">
          Delivery Addresses
        </h2>
        <p className="text-sm text-gray-500 tracking-tight text-center md:text-left px-4 md:px-0 mb-4 md:mb-0">
          Manage delivery addresses for faster checkout.
        </p>
      </div>
      <div className="border border-gray-200 mt-10 md:mt-0 rounded-lg md:border-0 md:rounded-none">

        {showSuccess && (
          <div className="mx-4 md:mx-6 mt-4 md:mt-6 p-3 md:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <FiCheck className="text-green-600 flex-shrink-0" size={20} />
            <p className="text-xs md:text-sm text-green-800 font-medium">Address saved successfully!</p>
          </div>
        )}

        <div className="p-4 space-y-4 border-b border-gray-100">

          {/* Address Input with Locate Pin */}
          <div className="relative flex gap-2">
            <div className="relative flex-1">

              <input
                type="text"
                value={addressSearch}
                onChange={handleAddressSearch}
                className="w-full pl-10 pr-12 py-2 md:py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:border-transparent transition-all"
                placeholder="Enter street, city, or postal code..."
                disabled={loadingLocation}
              />
              {/* Left icon */}
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />

              {/* Sm screens: Clickable animated pin at right */}
              <span
                onClick={getLocation}
                className={
                  `absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer block md:hidden 
                  transition-transform will-change-transform 
                  animate-bounce`}
                title="Use my current location"
                style={{
                  animation: 'bounce 1.2s infinite'
                }}
              >
                <FiMapPin size={20} className={loadingLocation ? 'animate-spin' : ''} />
              </span>

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && !showLabelInput && (
                <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((s, idx) => (
                    <li
                      key={s.place_id || idx}
                      className="p-3 hover:bg-[#F9F1E7] cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => handleSelectAddress(s)}
                    >
                      <div className="flex items-start gap-2">
                        <FiMapPin className="text-[#B88E2F] mt-1 flex-shrink-0" size={16} />
                        <span className="text-xs md:text-sm text-gray-700 tracking-tight">
                          {s.display_name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Large screens only: separate Locate Me button */}
            <button
              onClick={getLocation}
              type="button"
              disabled={loadingLocation}
              className="hidden md:flex px-3 py-1 bg-[#B88E2F] text-white rounded-lg hover:bg-[#9a7526] items-center gap-1 transition-colors tracking-tight disabled:opacity-50"
            >
              <FiMapPin size={16} />
              <span className='font-sm'>{loadingLocation ? 'Locating...' : 'Locate Me'}</span>
            </button>
          </div>
          {locationError && (
            <div className="text-xs text-red-500 mt-1">{locationError}</div>
          )}

          {showLabelInput && selectedAddress && (
            <div className="space-y-3 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-700 mb-2">Selected Address</p>
                <p className="text-xs md:text-sm text-gray-600 tracking-tight">{selectedAddress}</p>
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium text-gray-700 mb-2 block">Save this address as</label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setAddressLabel('home')}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border transition-all ${addressLabel === 'home'
                        ? 'bg-[#B88E2F] text-white border-[#B88E2F]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#B88E2F]'
                      }`}
                  >
                    <FiHome size={16} />
                    <span className="text-xs md:text-sm font-medium">Home</span>
                  </button>
                  <button
                    onClick={() => setAddressLabel('work')}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border transition-all ${addressLabel === 'work'
                        ? 'bg-[#B88E2F] text-white border-[#B88E2F]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#B88E2F]'
                      }`}
                  >
                    <FiBriefcase size={16} />
                    <span className="text-xs md:text-sm font-medium">Work</span>
                  </button>
                  <button
                    onClick={() => setAddressLabel('other')}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg border transition-all ${addressLabel === 'other'
                        ? 'bg-[#B88E2F] text-white border-[#B88E2F]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#B88E2F]'
                      }`}
                  >
                    <FiMapPin size={16} />
                    <span className="text-xs md:text-sm font-medium">Other</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveAddress}
                  className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 text-sm md:text-base bg-[#B88E2F] text-white rounded-lg hover:bg-[#9a7526] transition-colors duration-200 font-medium"
                >
                  <FiCheck size={18} />
                  Save <span className="hidden sm:inline">Address</span>
                </button>
                <button
                  onClick={handleCancelAddAddress}
                  className="px-3 md:px-4 py-1.5 text-sm md:text-base text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Saved Addresses */}
        <div className="p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiMapPin size={18} />
            Your Saved Addresses
          </h3>
          {savedAddresses.length > 0 ? (
            <div className="space-y-3">
              {savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-3 md:p-4 rounded-lg border transition-all ${address.isDefault
                    ? 'bg-[#F9F1E7] border-[#B88E2F]'
                    : 'bg-white border-gray-200 hover:border-[#B88E2F]'
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1.5 px-2 md:px-2.5 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 capitalize">
                          {getLabelIcon(address.label)}
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="px-2 md:px-2.5 py-1 bg-[#B88E2F] text-white rounded-md text-xs font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-[#B88E2F] tracking-tight leading-relaxed">
                        {address.address}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address)}
                          className="px-2 md:px-3 py-1 md:py-1.5 text-xs text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white border border-[#B88E2F] rounded-md transition-colors duration-200 font-medium whitespace-nowrap"
                        >
                          Set Default
                        </button>
                      )}
                              {!address.isDefault && <button
                                  onClick={() => handleDeleteAddress(address.id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors self-end"
                                  title="Delete address"
                              >
                                  <FiTrash2 size={16} />
                              </button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12 border border-dashed border-gray-300 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <FiMapPin className="text-gray-400" size={24} />
                </div>
                <p className="text-sm md:text-base text-gray-600 font-medium mb-1">No saved addresses yet</p>
                <p className="text-xs md:text-sm text-gray-400">Add your first delivery address above</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Animation CSS */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(-50%) scale(1); }
            25% { transform: translateY(-60%) scale(1.15); }
            50% { transform: translateY(-40%) scale(0.90); }
            75% { transform: translateY(-65%) scale(1.05); }
          }
        `}
      </style>
    </div>
  );
};

export default AddressScreen;
