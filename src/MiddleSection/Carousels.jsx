import React, { useState, useEffect } from 'react';
import BedsheetwithPictures from '../assets/BedsheetwithPictures.png';
import TableChair from '../assets/TableChair.png';
import FlowersAndTable from '../assets/FlowersAndTable.png';
import LuxuriousTableChair from '../assets/LuxuriousTableChair.png';
import BeautifulVessel from '../assets/BeautifulVessel.png';
import DiningbySunlight from '../assets/DiningBySunlight.png';
import { FaArrowRightLong } from 'react-icons/fa6';

const images = [
  { src: BedsheetwithPictures, description: 'Bed Sheet with Photo Frames', alt: 'Slide 1' },
  { src: TableChair, description: 'Luxurious Quality Table', alt: 'Slide 2' },
  { src: FlowersAndTable, description: 'Fresh Flowers', alt: 'Slide 3' },
  { src: LuxuriousTableChair, description: 'Luxurious Tables and Chairs', alt: 'Slide 4' },
  { src: DiningbySunlight, description: 'Dining By Sunlight', alt: 'Slide 5' },
  { src: BeautifulVessel, description: 'Beautiful Vessels for Plants', alt: 'Slide 6' },
];

const Carousels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 2000);
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [currentIndex]);

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex relative lg:mx-auto animate-slideUp">
      <div className="lg:w-80 lg:relative w-72 h-[30rem] flex-shrink-0">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full lg:rounded-none rounded-xl lg:mr-0 mr-5 h-full object-cover"
              />

              <h1 className='text-gray-700 mb-5 font-semibold text-lg mt-4 text-center'>{image.description}</h1>
              <div className="transform ml-5 lg:hidden flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`relative w-8 h-8 flex items-center justify-center ${currentIndex === index ? 'border-[1px] border-[#B88E2F] rounded-full' : 'border-transparent'}`}
                  >
                    <button
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#B88E2F]' : 'bg-gray-400'}`}
                    ></button>
                  </div>
                ))}
              </div>
            </div>

          ))}
        </div>

        <button
          onClick={goToNextSlide}
          className="absolute lg:block hidden top-[90%] right-10 transform -translate-y-1/2 bg-[#B88E2F] text-white px-4 py-3 shadow-md hover:bg-white hover:text-[#B88E2F] focus:outline-none"
        >
          <FaArrowRightLong />
        </button>
      </div>

      {/* Preview Card */}
      <div className="ml-6 w-80 h-[24rem] lg:block hidden">
        <img
          src={images[(currentIndex + 1) % images.length].src}
          alt={`Preview ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="mt-10 transform flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`relative w-8 h-8 flex items-center justify-center ${currentIndex === index ? 'border-[1px] border-[#B88E2F] rounded-full' : 'border-transparent'}`}
            >
              <button
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#B88E2F]' : 'bg-gray-400'}`}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousels;

