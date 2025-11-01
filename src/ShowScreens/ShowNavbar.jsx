import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowNavbar({ productName }) {
  return (
    <div className="bg-[#F9F1E7] sticky lg:top-20 top-16 z-20 shadow-sm">
      <div className="show-navbar py-6 lg:mx-20 mx-7">
        <div className="flex w-full lg:w-4/12 justify-start space-x-2 lg:space-x-4 items-center text-gray-500 text-md lg:text-base">
          <a href="/" className="hover:underline">
            Home
          </a>
          <FontAwesomeIcon className="text-black" icon={faAngleRight} />
          <a href="/shop" className="hover:underline"><span className="hidden lg:inline">Shop</span></a>
          <FontAwesomeIcon className="text-black hidden lg:inline" icon={faAngleRight} />
          <p className="font-semibold text-black truncate max-w-xs" title={productName}>
            {productName}
          </p>
        </div>
      </div>
    </div>
  );
}
