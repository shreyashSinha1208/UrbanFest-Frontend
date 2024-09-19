import Carousels from './Carousels';
import { FaArrowRight } from 'react-icons/fa6';

export default function ParentCarousel() {
  return (
    <div className='bg-[#FCF8F3] font-inter lg:mb-20 mb-32'>
      <div className="flex flex-col lg:flex-row mx-5 lg:mx-20 lg:py-32 py-16 justify-start bg-[#FCF8F3]">
        <div className="header lg:block hidden lg:text-left text-center w-full lg:mt-32 lg:w-1/2 mb-10 lg:mb-0">
          <h1 className='mb-2 font-extrabold text-3xl text-gray-700'>100+ Beautiful rooms <br className="lg:block hidden" /> <span className='lg:mt-2  '>inspiration</span></h1>
          <p className='mb-5 text-md '>Our designer already made a lot of beautiful <br className='lg:block hidden' /> <span className='mt-2'>prototype of rooms that inspire you.</span></p>
          <button type="submit" className='bg-[#B88E2F] h-12 w-40 px-3 text-white text-sm tracking-wider font-semibold'>Explore More <FaArrowRight className='inline ml-2'/></button>
        </div>
        <div className="carousel lg:ml-0 mb-20 flex justify-center">
          <Carousels />
        </div>
      </div>
      <div className='lg:hidden pb-20 mx-10 text-center  justify-center'>
        <h1 className='font-bold text-3xl text-gray-700'>100+ Beautiful rooms <br className="lg:block hidden" /> <span className='lg:mt-2  '>inspiration</span></h1>
      </div>
    </div>
  );
}
