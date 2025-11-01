import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: 'https://images.unsplash.com/photo-1708517196691-b1d75c483e4b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVkJTIwc2hlZXQlMjB3aXRoJTIwcGhvdG8lMjBmcmFtZXN8ZW58MHwxfDB8fHww&auto=format&fit=crop&q=60&w=600', description: 'BedSheet & Photo Frames', alt: 'Slide 1' },
  { src: 'https://plus.unsplash.com/premium_photo-1675970835815-3f2442346a1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGx1eHVyaW91cyUyMHF1YWxpdHklMjB0YWJsZXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600', description: 'Luxurious Quality Table', alt: 'Slide 2' },
  { src: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800', description: 'Fresh Flowers', alt: 'Slide 3' },
  { src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800', description: 'Luxurious Tables & Chairs', alt: 'Slide 4' },
  { src: 'https://images.unsplash.com/photo-1759782176730-c54ffac2f3bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGluaW5nJTIwYnklMjBkYXlsaWdodHxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600', description: 'Dining By Sunlight', alt: 'Slide 5' },
  { src: 'https://images.unsplash.com/photo-1701271040533-59a76ac4e887?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXRpZnVsJTIwdmVzc2VscyUyMGZvciUyMHBsYW50c3xlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600', description: 'Beautiful Vessels for Plants', alt: 'Slide 6' },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const intervalId = setInterval(goToNextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, isAutoPlaying, goToNextSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevSlide();
      if (e.key === 'ArrowRight') goToNextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  return (
    <div className="w-full h-full">
      {/* Mobile View - Full Remaining Height */}
      <div className="lg:hidden h-[calc(100vh-8rem)] flex flex-col bg-black relative overflow-hidden">
        
        {/* Carousel Container */}
        <div 
          className="flex-1 relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images with Ken Burns Effect */}
          <div className="absolute inset-0">
            {images.map((image, index) => {
              const isActive = currentIndex === index;
              const isPrev = currentIndex === (index + 1) % images.length;
              const isNext = (currentIndex + 1) % images.length === index;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isActive 
                      ? 'opacity-100 scale-100 z-20' 
                      : isPrev && direction === -1
                      ? 'opacity-0 scale-95 z-10'
                      : isNext && direction === 1
                      ? 'opacity-0 scale-95 z-10'
                      : 'opacity-0 scale-105 z-0'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Dynamic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Subtle Vignette */}
                  <div className="absolute inset-0 bg-radial-gradient opacity-40" 
                       style={{background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'}} />
                </div>
              );
            })}
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-30 flex flex-col justify-end pointer-events-none">
            
            {/* Description with Animation */}
            <div className="px-6 pb-6 space-y-4">
              <div className="overflow-hidden">
                <h2 
                  key={currentIndex}
                  className="text-white text-3xl font-bold tracking-tight leading-tight animate-slide-up"
                  style={{
                    animation: 'slideUp 0.7s ease-out',
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  {images[currentIndex].description}
                </h2>
              </div>
              
              {/* Progress Counter */}
              <div className="flex items-center space-x-2">
                <div className="h-px flex-1 bg-white/20 overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / images.length) * 100}%`
                    }}
                  />
                </div>
                <span className="text-white/60 text-sm font-medium tabular-nums">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="px-6 pb-8 pointer-events-auto">
              <div className="flex items-center justify-between">
                
                {/* Dots Navigation */}
                <div className="flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      disabled={isTransitioning}
                      className={`transition-all duration-500 rounded-full backdrop-blur-sm ${
                        currentIndex === index
                          ? 'w-10 h-2 bg-white shadow-lg shadow-white/50'
                          : 'w-2 h-2 bg-white/30 hover:bg-white/50 active:scale-90'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={goToPrevSlide}
                    disabled={isTransitioning}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all duration-300 hover:bg-white/20 disabled:opacity-50"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={24} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={goToNextSlide}
                    disabled={isTransitioning}
                    className="w-12 h-12 rounded-full bg-white backdrop-blur-md flex items-center justify-center text-black active:scale-90 transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg shadow-white/30"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={24} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Auto-play Indicator */}
          {isAutoPlaying && (
            <div className="absolute top-4 right-4 z-30">
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-xs font-medium">Auto</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View - Enhanced Layout */}
      <div className="hidden lg:block w-full h-full">
        <div className="flex gap-8 items-center">
          
          {/* Main Carousel - Takes more space */}
          <div className="relative flex-1 group">
            <div
              className="relative aspect-[5/6] overflow-hidden rounded-3xl bg-gray-900 shadow-2xl"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div
                className="flex h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div key={index} className="min-w-full h-full flex-shrink-0">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>

              {/* Desktop Navigation Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={goToPrevSlide}
                  disabled={isTransitioning}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:scale-110 transition-transform shadow-xl disabled:opacity-50"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={28} strokeWidth={2.5} />
                </button>
                <button
                  onClick={goToNextSlide}
                  disabled={isTransitioning}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:scale-110 transition-transform shadow-xl disabled:opacity-50"
                  aria-label="Next slide"
                >
                  <ChevronRight size={28} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Description and Progress */}
            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tighter">
                  {images[currentIndex].description}
                </h2>
                
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2.5">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === index
                        ? 'w-14 h-2.5 bg-[#B88E2F]'
                        : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 disabled:opacity-50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel - Fixed width */}
          <div className="w-80 flex-shrink-0 space-y-7">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
              <img
                src={images[(currentIndex + 1) % images.length].src}
                alt={`Preview ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Next Up</p>
              <p className="text-xl font-bold text-gray-900 tracking-tighter">
                {images[(currentIndex + 1) % images.length].description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                    currentIndex === index
                      ? 'border-[#B88E2F] shadow-lg ring-2 ring-[#B88E2F]/20'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}