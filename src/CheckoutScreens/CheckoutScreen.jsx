import { useEffect, useState } from "react";
import CheckOutBill from "./CheckOutBill";
import CheckOutForm from "./CheckOutForm";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function CheckoutScreen() {
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

 useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen  py-12">
      <div className="lg:mx-20 mx-6  lg:flex lg:space-x-8 justify-between ">
        <CheckOutForm onAddressSelect={handleAddressSelect} />
        <CheckOutBill selectedAddress={selectedAddress} />
      </div>
    </div>
  );
}