import { faAngleRight, faArrowRight, faArrowRightToFile, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ShowNavbar({productName}) {
          return (
                    <div className="bg-[#F9F1E7]">
                              <div className="show-navbar py-7 flex lg:mx-20 mx-10 ">
                                        <div className="main flex w-full lg:w-4/12 justify-around">
                                                  <div><p className="text-gray-500"><a href="/">Home </a><span className="lg:inline hidden">&nbsp; &nbsp;</span><FontAwesomeIcon className="text-black" icon={faAngleRight}></FontAwesomeIcon></p></div>
                                                  <div><p className="text-gray-500">Shop <span className="lg:inline hidden">&nbsp;&nbsp;</span><FontAwesomeIcon className="text-black" icon={faAngleRight}></FontAwesomeIcon></p></div>
                                                  <div className="lg:inline hidden border-r-2 border-gray-500"></div>
                                                  <div><p className=" lg:mt-0 lg:text-base font-semibold"> {productName}</p></div>
                                        </div>
                              </div>
                    </div>
          )
}