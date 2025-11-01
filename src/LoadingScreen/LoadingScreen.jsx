import React from 'react';
import LogoImage from '../assets/Logo.png';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-[#B88E2F]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse top-0 -left-16 sm:-left-20"></div>
        <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-[#B88E2F]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 bottom-0 -right-16 sm:-right-20 animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full max-w-xs sm:max-w-sm mx-auto">
        {/* Main Loader Container */}
        <div className="relative">
          {/* Middle Progress Circle */}
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
            <svg className="circular-svg" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#B88E2F"
                strokeWidth="2"
                opacity="0.1"
              />
              {/* Animated progress circle */}
              <circle
                className="circular-progress"
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#B88E2F"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            {/* Center content - Logo Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Logo Image with background */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-transparent flex items-center justify-center animate-pulse-subtle relative overflow-hidden">
                  {/* Shine effect */}
                  <div className="shine-effect"></div>
                  <img
                    src={LogoImage}
                    alt="Logo"
                    className="w-14 h-14 sm:w-16 sm:h-16 object-contain object-center z-10"
                    style={{ imageRendering: 'auto' }}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .circular-svg {
          transform: rotate(-90deg);
          width: 100%;
          height: 100%;
        }
        .circular-progress {
          stroke-dasharray: 264;
          stroke-dashoffset: 264;
          animation: circular-progress 2.5s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(184, 142, 47, 0.3));
        }
        @keyframes circular-progress {
          0% { stroke-dashoffset: 264; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -264; }
        }
        .shine-effect {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%);
          animation: shine 3s ease-in-out infinite;
          z-index: 20;
        }
        @keyframes shine {
          0%, 100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
