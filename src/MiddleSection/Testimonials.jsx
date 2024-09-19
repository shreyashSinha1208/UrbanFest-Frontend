import Person1 from '../assets/Udit.jpg';
import Person2 from '../assets/Shaily2.jpg';
import Person3 from '../assets/rajivnayan.jpg';
import { MdVerified } from "react-icons/md";

export default function Testimonials() {

          const testimonials = [
                    {
                              text: "UrbanFest transformed my living space into a cozy retreat with their stylish and high-quality furniture. The attention to detail in every piece is remarkable.",
                              personName: "Udit Sinha",
                              username: "@uditsinha",
                              imgSrc: Person1
                    },
                    {
                              text: "I am thrilled with my UrbanFest purchase. Their furniture blends modern aesthetics with exceptional comfort. Highly recommend for anyone.",
                              personName: "Shaily Sinha",
                              username: "@shailySinha",
                              imgSrc: Person2
                    },
                    {
                              text: "From the sleek design to the durability, UrbanFest's furniture has exceeded my expectations. It has added both functionality and elegance to my space.",
                              personName: "Kumar Rajiv Nayan",
                              username: "@rajivnayan",
                              imgSrc: Person3
                    }
          ];

          return (
                    <div className="font-inter mb-32 mt-28 mx-10 lg:mx-20">
                              <div className="header-section text-center">
                                        <h1 className='text-xl text-[#B88E2F] font-semibold'>Testimonials.</h1>
                                        <h1 className='mt-5 tracking-normal text-gray-800 text-4xl font-extrabold'>
                                                  We have worked with thousands <br /><span className='mt-3'>of amazing Clients.</span>
                                        </h1>
                              </div>

                              <div className="testimonial-cards mt-24 grid animate-slideUp lg:grid-cols-3 grid-cols-1 gap-8">
                                        {testimonials.map((testimonial, index) => (
                                                  <div key={index} className="testimonial-card border py-6 px-5 transition-transform cursor-pointer transform hover:scale-105 selection:text-white selection:bg-[#B88E2F] duration-700 bg-gray-50 rounded-3xl">
                                                            <div className="card-text mb-8">
                                                                      <p className='text-[15px] tracking-tight text-black font-normal'>
                                                                                <i>"</i> {testimonial.text} <i>"</i>
                                                                      </p>
                                                            </div>
                                                            <div className="card-person flex justify-start">
                                                                      <div className="img-div mt-1 w-12 h-12 overflow-hidden rounded-full">
                                                                                <img className='w-full h-full object-cover' src={testimonial.imgSrc} alt={testimonial.personName} />
                                                                      </div>

                                                                      <div className="img-desc ml-3 mt-2">
                                                                                <h1 className='text-sm font-semibold'>{testimonial.personName} <MdVerified className='inline' /></h1>
                                                                                <h1 className='text-gray-500 text-sm'>{testimonial.username}</h1>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        ))}
                              </div>
                    </div>
          );
}
