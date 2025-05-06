
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import hydraImg from "/img/hydra.png";
import bhopalImg from "/img/bhopal.jpg";
import neworleansImg from "/img/neworleans.jpg";
import jakartaImg from "/img/jakarta.jpg";

const Carousel = () => {
  const navigate = useNavigate();
  const items = [
    { 
      id: 1,
      image: hydraImg, 
      title: "Hydra", 
      description: "This is a great product!",
      fullContent: "Detailed content about Hydra case study..."
    },
    { 
      id: 2,
      image: bhopalImg, 
      title: "Bhopal Tragedy", 
      description: "This is another great product!",
      fullContent: "Detailed content about Bhopal Tragedy..."
    },

    { id:3, 
      image: neworleansImg,
      title: "Katrina Hurricane", 
      description: "This is an amazing product!",
      fullContent: "Detailed content about Katrina Hurricane..."
    },

    { id:4, 
      image: jakartaImg, 
      title: "Encroachment Jakarta", 
      description: "This is a fantastic product!",
      fullContent: "The catastrophic floods that submerged Indonesia's capital in January 2020 displaced over 60,000 residents and claimed 66 lives. Triggered by torrential monsoon rains (reaching 377mm/day – the heaviest since 1866), the disaster exposed systemic vulnerabilities: rapid urbanization had converted 97% of Jakarta's natural waterways into concrete channels, while land subsidence (25cm/year in North Jakarta) worsened inundation. Climate change intensified the rainfall, but human factors like deforestation in upstream Bogor and improper waste management (blocking 60% of drainage systems) turned a natural phenomenon into a humanitarian crisis. This event became a catalyst for Indonesia's controversial capital relocation plan to Nusantara, highlighting the existential threat posed by sinking megacities in the climate era."
    },
    
  ];    

  const [visibleItems, setVisibleItems] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth >= 1024) setVisibleItems(4);
      else if (window.innerWidth >= 800) setVisibleItems(3);
      else setVisibleItems(1);
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const handleCardClick = (item) => {
    navigate(`/case-study/${item.id}`, { state: { item } });
  };

  return (
    <section id="cases" className="relative container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Case Studies</h2>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10"
        onClick={prevSlide}
      >
        <FaChevronLeft size={20} />
      </button>

      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * (100 / visibleItems))}%)`,
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex-shrink-0 w-full cursor-pointer"
              style={{ flex: `0 0 ${100 / visibleItems}%` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => handleCardClick(item)}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden mx-2 h-full">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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