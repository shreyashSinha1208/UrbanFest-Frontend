import CheckOutBill from "./CheckOutBill";
import CheckOutForm from "./CheckOutForm";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useEffect, useState } from "react";

export default function CheckoutScreen() {

          const [loading, setLoading] = useState(true);
          useEffect(() => {
                    const loadingTimer = setTimeout(() => {
                              setLoading(false); // Hide loading screen after 3 seconds
                    }, 2000);
          })

          if (loading) return <LoadingScreen />;

          return (
                    <div className="lg:m-20 mx-10 lg:flex justify-between font-inter">
                              <CheckOutForm />
                              <CheckOutBill />
                    </div>
          );
}