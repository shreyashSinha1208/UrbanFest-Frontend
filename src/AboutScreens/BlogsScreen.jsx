import React from "react";
import BeautifulSofa from "../assets/BeautifulSofa.png"
import Hero from '../assets/Hero-Image.png'
import Pingky from '../assets/Pingky.png'

// Mock data for blogs
const blogs = [
          {
                    id: 1,
                    title: "The Ultimate Guide to Choosing the Perfect Sofa",
                    description:
                              "Learn how to select the best sofa for your living room, focusing on size, comfort, and style.",
                    image: BeautifulSofa,
                    date: "August 20, 2024",
          },
          {
                    id: 2,
                    title: "Modern Furniture Trends for 2024",
                    description:
                              "Explore the latest furniture trends that will dominate in 2024, from minimalist designs to bold colors.",
                    image: Hero,
                    date: "July 15, 2024",
          },
          {
                    id: 3,
                    title: "How to Care for Your Wooden Furniture",
                    description:
                              "Learn how to properly maintain your wooden furniture to ensure it lasts for years to come.",
                    image: Pingky,
                    date: "June 10, 2024",
          },
];

const BlogCard = ({ blog }) => {
          return (
                    <div className="bg-white font-inter shadow-lg rounded-lg tracking-tighter overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
                              <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-52 object-cover"
                              />
                              <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                                        <p className="text-gray-600 tracking-tighter mb-4">{blog.description}</p>
                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                                  <span>{blog.date}</span>
                                                  <button className="text-blue-600 hover:underline">Read More</button>
                                        </div>
                              </div>
                    </div>
          );
};

const BlogsScreen = () => {
          return (
                    <div className="min-h-screen font-inter py-12 mx-20">
                              <div className="max-w-7xl mx-auto">
                                        <h1 className="text-4xl tracking-tighter font-bold text-center mb-12">
                                                  Latest Furniture Trends & Tips
                                        </h1>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                  {blogs.map((blog) => (
                                                            <BlogCard key={blog.id} blog={blog} />
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};

export default BlogsScreen;
