import MaskImage from '../assets/Mask.png';
import Plate from '../assets/Plate.png';
import LivingRoom from '../assets/LivingRoom.png';


export default function BrowseRange() {

          const images = [
                    { src: MaskImage, alt: 'Mask-Image', title: 'Dining', key: 1 },
                    { src: Plate, alt: 'Plate-Image', title: 'Living', key: 2 },
                    { src: LivingRoom, alt: 'LivingRoom-Image', title: 'Bedroom', key: 3 },
          ];

          return (
                    <div className='mb-40 animate-slideUp mt-32 lg:mx-20 font-inter cursor-pointer'>
                              <div className="header-section mx-5 text-center">
                                        <h1 className='text-3xl selection:text-[white] selection:bg-[#B88E2F] text-gray-700 font-extrabold'>Browse The Range.</h1>
                                        <p className='text-xl mt-5 selection:text-[white] selection:bg-[#B88E2F] text-gray-600'>Explore your favourite products with our wide range.</p>
                              </div>

                              <div className="grid grid-cols-1 lg:mx-0  mx-10  lg:grid-cols-3 gap-10 mt-20">

                                        {images.map((image, index) => (
                                                  <a href='#' key={index}>
                                                            <div className='flex flex-col items-center' key={image.key}>
                                                                      <img src={image.src} alt={image.alt} className='w-full h-full object-cover' />
                                                                      <p className='text-center selection:text-[white] selection:bg-[#B88E2F] text-lg mt-5 font-semibold'>{image.title}</p>

                                                            </div>
                                                  </a>
                                        ))}

                              </div>
                    </div>
          );
}
