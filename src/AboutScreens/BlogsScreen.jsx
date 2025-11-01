import React, { useState } from "react";
import { Calendar, ArrowRight } from 'lucide-react';

// Mock data for blogs
const blogs = [
          {
                    id: 1,
                    title: "The Ultimate Guide to Choosing the Perfect Sofa",
                    description:
                              "Learn how to select the best sofa for your living room, focusing on size, comfort, and style.",
                    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
                    date: "August 20, 2024",
                    link: "https://www.housebeautiful.com/uk/decorate/living-room/a85/buy-sofa/"
          },
          {
                    id: 2,
                    title: "Modern Furniture Trends for 2024",
                    description:
                              "Explore the latest furniture trends that will dominate in 2024, from minimalist designs to bold colors.",
                    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
                    date: "July 15, 2024",
                    link: "https://www.decorilla.com/online-decorating/interior-design-trends-2026/"
          },
          {
                    id: 3,
                    title: "How to Care for Your Wooden Furniture",
                    description:
                              "Learn how to properly maintain your wooden furniture to ensure it lasts for years to come.",
                    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
                    date: "June 10, 2024",
                    link: "https://www.bassettfurniture.com/blog/how-to-care-for-wood-furniture.html"
          },
];

const BlogCard = ({ blog, index }) => {
          const [isHovered, setIsHovered] = useState(false);

          return (
                    <div
                              className="bg-white rounded-2xl tracking-tighter overflow-hidden transition-all duration-300 ease-in-out border border-[#B88E2F]/20 hover:border-[#B88E2F] hover:-translate-y-2 group"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                              style={{
                                        animationDelay: `${index * 150}ms`
                              }}
                    >
                              <div className="relative overflow-hidden h-52">
                                        <img
                                                  src={blog.image}
                                                  alt={blog.title}
                                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#B88E2F]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                              <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-[#8B7024] mb-3">
                                                  <Calendar className="w-4 h-4 text-[#B88E2F]" />
                                                  <span className="tracking-tight">{blog.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-[#B88E2F] tracking-tight leading-tight">
                                                  {blog.title}
                                        </h3>
                                        <p className="text-[#6B5B2A] tracking-tight mb-4 leading-relaxed">
                                                  {blog.description}
                                        </p>
                                        <a href={blog.link} className="inline-flex cursor-pointer items-center gap-2 text-[#B88E2F] font-semibold hover:gap-3 transition-all duration-300 tracking-tight group/btn">
                                                  Read More
                                                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                              </div>
                    </div>
          );
};

const BlogsScreen = () => {
          return (
                    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFF3E3] to-[#FFEFD5] relative overflow-hidden">
                              {/* Animated background elements */}
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute w-96 h-96 bg-[#B88E2F]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse top-20 -left-20"></div>
                                        <div className="absolute w-96 h-96 bg-[#B88E2F]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 bottom-20 -right-20 animation-delay-2000"></div>
                              </div>

                              <div className="relative z-10 py-16 px-4 lg:px-8">
                                        <div className="max-w-7xl mx-auto">
                                                  {/* Header Section */}
                                                  <div className="text-center mb-16 animate-fade-in">

                                                            <h1 className="text-4xl tracking-tighter font-bold text-[#B88E2F] mb-4">
                                                                      Latest Furniture Trends & Tips
                                                            </h1>
                                                            <p className="text-lg text-[#8B7024] max-w-2xl mx-auto tracking-tight">
                                                                      Discover expert insights and inspiration for your home
                                                            </p>
                                                  </div>

                                                  {/* Blog Grid */}
                                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-fade-in">
                                                            {blogs.map((blog, index) => (
                                                                      <BlogCard key={blog.id} blog={blog} index={index} />
                                                            ))}
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

        .stagger-fade-in > * {
          animation: fade-in 0.6s ease-out backwards;
        }

        .stagger-fade-in > *:nth-child(1) {
          animation-delay: 0.1s;
        }

        .stagger-fade-in > *:nth-child(2) {
          animation-delay: 0.25s;
        }

        .stagger-fade-in > *:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
                    </div>
          );
};

export default BlogsScreen;