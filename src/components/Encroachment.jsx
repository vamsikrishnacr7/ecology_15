import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { section } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const factors = [
  "Illegal Land Grabbing",
  "Deforestation",
  "Urban Expansion",
  "Industrial Growth",
  "Agricultural Encroachment",
  "Infrastructure Projects",
  "Mining Activities",
  "Tourism and Commercialization",
];

export default function EncroachmentList() {
  const listRefs = useRef([]);

  useEffect(() => {
    listRefs.current.forEach((item, index) => {
      gsap.to(item, {
        color: "#ffcc00", // Highlighted color
        scrollTrigger: {
          trigger: item,
          start: "top 50%",
          end: "top 40%",
          toggleActions: "play reverse play reverse",
          onEnter: () =>
            listRefs.current.forEach((el, i) =>
              el.style.color = i === index ? "#ffcc00" : "#ffffff"
            ),
          onLeaveBack: () =>
            listRefs.current.forEach((el, i) =>
              el.style.color = i === index ? "#ffcc00" : "#ffffff"
            ),
        },
      });
    });
  }, []);

  return (
    <section className = "bg-black py-4">
    <div className="flex flex-col lg:flex-row h-dvh w-full text-white items-center justify-center px-6 lg:px-16">
      
      {/* Left Section - Heading */}
      <div className="lg:w-1/3 w-full text-center lg:text-left p-10">
        <h1 className="text-4xl font-bold text-gray-500">
          The Different Types of <span className="text-white">Encroachment</span>
        </h1>
      </div>

      {/* Middle Section - Factors List */}
      <div className="lg:w-1/3 w-full p-10">
        <ul className="space-y-6 text-[12px] md:text-[30px] special-font hero-heading1 tracking-wide">
          {factors.map((factor, index) => (
            <motion.li
              key={index}
              ref={(el) => (listRefs.current[index] = el)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="transition-all duration-500"
            >
              {factor}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:block lg:w-1/3 w-full flex justify-center lg:justify-end">
        <img
          src="img/treelogo.webp"
          alt="Encroachment"
          className="w-[300px] md:w-[350px] lg:w-[400px] h-auto rounded-lg shadow-lg"
        />
      </div>

    </div>
    </section>
  );
}
