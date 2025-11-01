import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { FaHome, FaBriefcase, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

export default function CheckOutForm({ onAddressSelect }) {
  const { user } = useAuth();
  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.addresses?.find(addr => addr.isDefault)?._id || user?.addresses?.[0]?._id || null
  );

  useEffect(() => {
    if (selectedAddressId && onAddressSelect) {
      const selectedAddress = user?.addresses?.find(addr => addr._id === selectedAddressId);
      if (selectedAddress) {
        onAddressSelect(selectedAddress);
      }
    }
  }, []);

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = user?.addresses?.find(addr => addr._id === addressId);
    if (onAddressSelect) {
      onAddressSelect(selectedAddress);
    }
  };

  const getIconForLabel = (label) => {
    switch (label.toLowerCase()) {
      case 'home':
        return <FaHome className="text-[#B88E2F]" />;
      case 'work':
        return <FaBriefcase className="text-[#B88E2F]" />;
      default:
        return <FaMapMarkerAlt className="text-[#B88E2F]" />;
    }
  };

  return (
    <div className="billing-screen w-full lg:w-8/12 lg:pr-4">
      <h1 className="text-2xl tracking-tight lg:text-left text-center font-bold lg:mt-0 ">
        Select a delivery address.
      </h1>
      

      {/* Saved Addresses */}
      <div className="space-y-4 my-6">
        {user?.addresses && user.addresses.length > 0 ? (
          user.addresses.map((address) => (
            <div
              key={address._id}
              onClick={() => handleAddressSelect(address._id)}
              className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedAddressId === address._id
                  ? 'border-[#B88E2F] bg-gray-50'
                  : 'border-gray-200 hover:border-[#d4a574] hover:bg-gray-50'
              }`}
            >
              {/* Radio Button */}
              <div className="flex tracking-tight items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedAddressId === address._id
                        ? 'border-[#B88E2F] bg-[#B88E2F]'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAddressId === address._id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>

                {/* Address Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getIconForLabel(address.label)}
                    <span className="font-semibold text-gray-900 capitalize">
                      {address.label}
                    </span>
                    {address.isDefault && (
                      <span className="text-xs bg-[#B88E2F] text-white px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {address.address}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaMapMarkerAlt className="mx-auto text-4xl mb-3 text-gray-300" />
            <p>No saved addresses found</p>
          </div>
        )}
      </div>

    </div>
  );
}