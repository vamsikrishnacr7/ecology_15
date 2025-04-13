import React, { useState, useEffect } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = () => {
  const items = [
    { image: "img/hydra.png", title: "Hydra", description: "This is a great product!" },
    { image: "img/bhopal.jpg", title: "Bhopal Tragedy", description: "This is another great product!" },
    { image: "img/neworleans.jpg", title: "Katrina Hurricane", description: "This is an amazing product!" },
    { image: "img/jakarta.jpg", title: "Encroachment Jakarta", description: "This is a fantastic product!" },
  ];    

  const [visibleItems, setVisibleItems] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Adjust visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(4); // Desktop: Show 4 items
      } else if (window.innerWidth >= 800) {
        setVisibleItems(3); // Tablet: Show 3 items
      } else {
        setVisibleItems(1); // Mobile: Show 1 item
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Navigation functions (Infinite scrolling)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <section id = "cases" className="relative container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Case Studies</h2>

      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10"
        onClick={prevSlide}
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Carousel Container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * (100 / visibleItems)) % (items.length * (100 / visibleItems))}%)`,
            paddingLeft: "5%", // Balance first and last card alignment
            paddingRight: "5%",
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-full"
              style={{ flex: `0 0 ${100 / visibleItems}%` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card image={item.image} title={item.title} description={item.description} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Scroll Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10"
        onClick={nextSlide}
      >
        <FaChevronRight size={20} />
      </button>
    </section>
  );
};

export default Carousel;
