import React from 'react';

const DummySection = () => {
  const dummyArray = Array(8).fill(0); // Change the number to match the number of items you expect

  return (
    <div className="mb-16">
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
        {dummyArray.map((_, index) => (
          <div
            key={index}
            className="flex justify-center cursor-pointer lg:mt-0 mt-5 transition-transform transform hover:scale-105 duration-500 relative"
            style={{ animation: `slide-in 0.5s ease-out ${index * 0.1}s forwards` }} // Add staggered animation
          >
            <div className="bg-gray-200 h-96 w-full rounded-xl animate-pulse">
              <div className="rounded-t-xl h-[70%] w-full bg-gray-300"></div>
              <div className="card-text p-4">
                <div className="h-6 bg-gray-300 mb-2 rounded-md"></div>
                <div className="h-4 bg-gray-300 mb-2 rounded-md w-3/4"></div>
                <div className="h-5 bg-gray-300 rounded-md w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateX(50%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DummySection;
