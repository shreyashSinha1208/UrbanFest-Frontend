import React from 'react';
import Marquee from 'react-fast-marquee';
import Person1 from '../assets/Udit.jpg';
import Person2 from '../assets/Shaily2.jpg';
import Person3 from '../assets/Akshat.jpeg'
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
      personName: "Rohit Sharma",
      username: "@sharmaRohit",
      imgSrc: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
    },
    {
      text: "The quality and craftsmanship of UrbanFest furniture is unmatched. Every piece feels premium and has completely elevated the look of my home.",
      personName: "Priya Sharma",
      username: "@priyasharma",
      imgSrc: "https://img.freepik.com/free-vector/smiling-woman-with-braided-hair_1308-174961.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
      text: "UrbanFest's customer service is as excellent as their products. From selection to delivery, everything was seamless. Absolutely love my new furniture!",
      personName: "Akshat Jain",
      username: "@akshatjain",
      imgSrc: Person3
    }
  ];

  return (
    <div className="mb-20 lg:my-20 overflow-hidden">
      <div className="header-section text-center px-10">
        <h1 className='text-2xl text-[#B88E2F] tracking-tighter font-semibold'>testimonials.</h1>
        <h1 className='mt-5 tracking-tighter text-gray-800 lg:text-4xl text-3xl font-extrabold'>
          We have worked with thousands <br className='lg:block hidden' />
          <span className='mt-3'>of amazing Clients.</span>
        </h1>
      </div>

      <div className="mt-16 relative">
        {/* Gradient overlays for smooth fade effect - optional if using Marquee's gradient prop */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <Marquee speed={30} gradient={false} pauseOnHover={true}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card flex-shrink-0 w-[350px] mx-4 border py-6 px-5 transition-transform cursor-pointer transform hover:scale-105 selection:text-white selection:bg-[#B88E2F] duration-700 bg-gray-50 rounded-3xl"
            >
              <div className="card-text lg:mb-8 mb-4">
                <p className='text-[15px] tracking-tight text-black font-normal'>
                  <i>"</i> {testimonial.text} <i>"</i>
                </p>
              </div>
              <div className="card-person flex justify-start">
                <div className="img-div lg:mt-1 w-12 h-12 overflow-hidden rounded-full">
                  <img className='w-full h-full object-cover' src={testimonial.imgSrc} alt={testimonial.personName} />
                </div>
                <div className="img-desc ml-3 mt-2">
                  <h1 className='text-sm font-semibold'>{testimonial.personName} <MdVerified className='inline' /></h1>
                  <h1 className='text-gray-500 text-sm'>{testimonial.username}</h1>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
