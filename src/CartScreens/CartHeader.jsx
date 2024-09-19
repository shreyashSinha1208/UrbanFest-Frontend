import CartHeaderImg from '../assets/CartHeader.png';
import LogoImage from '../assets/Logo.png'
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/fonts.js'


export default function CartHeader() {
          return (
                    <div>
                              <div className="cart-image relative font-inter">
                                        <img src={CartHeaderImg} alt="cart-Image" className="w-full h-60 object-cover" />
                                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                                                  <img src={LogoImage} className="w-12 h-8 mb-2" alt="Logo-Image" />
                                                  <h1 className="text-4xl text-black font-bold tracking-wider">Cart</h1>
                                                  <p className="text-gray-700 mt-3"><a href="/" className='text-black font-bold'>Home</a><span className="lg:inline hidden"> &nbsp;
                                                  </span><FontAwesomeIcon className="text-black" icon={faAngleRight}></FontAwesomeIcon>
                                                  <span className='ml-2'>Cart</span></p>
                                                 
                                        </div>
                              </div>
                    </div>

          )
}