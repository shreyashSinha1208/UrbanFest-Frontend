import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export default function CartTotal({ totalPrice }) {
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [priceleft, setPriceleft] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const discountValue = totalPrice * 0.1;
    setDiscount(discountValue);
    if (totalPrice < 10000) {
      setShippingFee(200);
      setPriceleft(10000 - totalPrice);
    } else {
      setShippingFee(0);
      setPriceleft(0);
    }

    // Calculate the final total (after discount and adding shipping fee)
    const finalTotalValue = totalPrice - discountValue + shippingFee;
    setFinalTotal(finalTotalValue);
  }, [totalPrice, shippingFee]);

  const redirectCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      {totalPrice > 0 && (
        <div className="cart-total sticky border-2 shadow-sm border-gray-300 font-inter rounded-xl bg-[#F9F1E7] pt-5 px-10">
          <h1 className="text-xl text-center font-bold">Cart Totals</h1>
          <div className="flex justify-between mt-10">
            <p className="text-md tracking-tight">Subtotal</p>
            <p className="text-md tracking-tighter font-semibold text-[#B88E2F]">
              ₹ {totalPrice.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-md tracking-tight">Discounts</p>
            <p className="text-md tracking-tighter font-semibold text-green-600">
              - ₹ {discount.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-md tracking-tight">Shipping</p>
            <p className="text-md tracking-tighter font-semibold text-[#B88E2F]">
              {(shippingFee > 0) ? "₹ " + shippingFee.toLocaleString('en-IN') : "FREE"}
            </p>
          </div>
          <div className="flex justify-between mt-5">
            <p className="text-md tracking-tight">Total</p>
            <p className="text-md tracking-tighter font-bold text-[#B88E2F]">
              ₹ {finalTotal.toLocaleString('en-IN')}
            </p>
          </div>
          {(priceleft > 0 &&
            <div className="flex justify-between mt-5">
              <p className='text-center'>Add more items of worth ₹ {priceleft.toLocaleString('en-IN')} to get free shipping!!</p>
            </div>
          )}
          <div className="flex justify-center py-6">
            <button
              onClick={redirectCheckout}
              className="bg-[#B88E2F] h-12 w-40 px-3 text-white text-sm tracking-wider font-semibold"
              type="submit"
            >Checkout <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
