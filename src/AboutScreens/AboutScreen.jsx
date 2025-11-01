import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowRight, Code, Database, Server, Zap } from 'lucide-react';

const position = [12.9377152, 77.5612211];

export default function AboutScreen() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const techStack = [
    { name: 'React', icon: Code, description: 'Dynamic UI' },
    { name: 'Node.js', icon: Server, description: 'Scalable Backend' },
    { name: 'MongoDB', icon: Database, description: 'Flexible Database' },
    { name: 'Express', icon: Zap, description: 'Fast Server' }
  ];

 

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[#B88E2F]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse top-0 -left-20"></div>
        <div className="absolute w-96 h-96 bg-[#B88E2F]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 bottom-0 -right-20 animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center py-16 px-4 lg:px-8">
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">

            <h1 className="text-5xl font-bold text-[#B88E2F] mb-4 tracking-tighter">
              UrbanFest<sup className="text-xl">TM</sup>
            </h1>
            <p className="text-lg text-[#8B7024] max-w-2xl mx-auto tracking-tight">
              Crafting exceptional digital experiences with cutting-edge technology
            </p>

          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Story Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-[#B88E2F]/20 p-8 hover:border-[#B88E2F] transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-[#B88E2F] mb-4 flex items-center gap-2 tracking-tight">
                  <span className="w-2 h-8 bg-[#B88E2F] rounded-full"></span>
                  My Story
                </h2>
                <p className="text-[#6B5B2A] leading-relaxed mb-2 tracking-tight">
                  I developed a robust platform designed to deliver seamless user experiences.
                  My journey involved tackling complex challenges including API integrations,
                  cross-browser compatibility, and performance optimization to ensure lightning-fast
                  load times and smooth interactions.
                </p>

              </div>

              {/* Tech Stack Grid */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-[#B88E2F]/20 lg:p-8 p-6">
                <h2 className="text-2xl font-bold text-[#B88E2F] mb-6 flex items-center gap-2 tracking-tight">
                  <span className="w-2 h-8 bg-[#B88E2F] rounded-full"></span>
                  Technology Stack
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {techStack.map((tech, index) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        onMouseEnter={() => setHoveredTech(index)}
                        onMouseLeave={() => setHoveredTech(null)}
                        className="relative bg-gradient-to-br from-[#FFF8F0] to-[#FFF3E3] rounded-2xl p-6 border border-[#B88E2F]/20 hover:border-[#B88E2F] transition-all duration-300 cursor-pointer group"
                        style={{
                          transform: hoveredTech === index ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 border"
                            style={{
                              backgroundColor: hoveredTech === index ? '#B88E2F' : '#FFF8F0',
                              borderColor: hoveredTech === index ? '#B88E2F' : '#B88E2F33',
                            }}
                          >
                            <Icon
                              className="w-7 h-7 transition-all duration-300"
                              style={{
                                color: hoveredTech === index ? 'white' : '#B88E2F',
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#B88E2F] tracking-tight">{tech.name}</h3>
                            <p className="text-xs text-[#8B7024] mt-1 tracking-tight">{tech.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="lg:sticky lg:top-8 h-fit">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-[#B88E2F]/20 p-6 hover:border-[#B88E2F] transition-all duration-300">
                <h2 className="text-2xl font-bold text-[#B88E2F] mb-4 flex items-center gap-2 tracking-tight">
                  <span className="w-2 h-8 bg-[#B88E2F] rounded-full"></span>
                  Find Us
                </h2>
                <div className="rounded-2xl overflow-hidden border border-[#B88E2F]/30" style={{ height: "450px" }}>
                  <MapContainer
                    center={position}
                    zoom={18}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <Marker position={position}>
                      <Popup>
                        <div className="text-center p-2">
                          <strong className="text-[#B88E2F]">Padmavati Marketing</strong>
                          <br />
                          Banashankari 1st Stage
                          <br />
                          Bengaluru South, India
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-[#FFF8F0] to-[#FFF3E3] rounded-xl border border-[#B88E2F]/20">
                  <p className="text-sm text-[#6B5B2A] tracking-tight">
                    <strong className="text-[#B88E2F]">📍 Address:</strong> Padmavati Marketing, Banashankari 1st Stage, Bengaluru South, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}