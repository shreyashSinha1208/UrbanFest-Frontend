import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaArrowRight } from 'react-icons/fa';

const position = [12.9377152, 77.5612211];

export default function AboutScreen() {
          return (
                    <div className="min-h-screen  animate-slideUp bg-[#FFF3E3] font-inter flex items-center justify-center py-16 px-4">
                              <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
                                        {/* Left side - Words about the eCommerce */}
                                        <div className="text-center lg:text-left">
                                                  <h1 className="text-4xl tracking-tighter font-bold text-[#B88E2F] mb-6">About UrbanFest <sup className='text-sm'>
                                                            TM</sup></h1>
                                                  <p className="text-xl tracking-tighter text-[#B88E2F] leading-relaxed">
                                                            Our website was developed using a robust tech stack designed to deliver a seamless user experience. We used <strong>React</strong> for building the user interface, ensuring a dynamic and responsive design. The backend is powered by <strong>Node.js</strong> with <strong>Express</strong>, providing a scalable and efficient server environment. For database management, we rely on <strong>MongoDB</strong>, which allows us to handle large amounts of data flexibly.
                                                            <br /><br />
                                                            One of the key challenges we faced during development was integrating various APIs and ensuring cross-browser compatibility. We also tackled performance optimization issues to ensure fast load times and smooth interactions.
                                                            <br /><a href="/" className='font-bold'>Continue to Website <FaArrowRight className='inline ml-2' /></a>
                                                  </p>
                                        </div>

                                        {/* Right side - Map displaying the company's location */}
                                        <div style={{ height: "450px", width: "100%" }}>
                                                  <MapContainer center={position} zoom={18} style={{ height: "100%", width: "100%" }}>
                                                            <TileLayer
                                                                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                                                      attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> & <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                                            />
                                                            <Marker position={position}>
                                                                      <Popup>
                                                                                Padmavati Marketing, <br /> Banashankari 1st Stage, <br /> Bengaluru South, India
                                                                      </Popup>
                                                            </Marker>
                                                  </MapContainer>
                                        </div>
                              </div>
                    </div>
          );
}
