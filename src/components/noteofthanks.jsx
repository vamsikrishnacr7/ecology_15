import React, { useRef, useState } from 'react';

// Tilt effect wrapper
const BentoTilt = ({ children, className = '' }) => {
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ${className}`}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Single card with 3 professors
const ProfessorsCard = () => {
  const professors = [
    { name: 'Dr.Suresh Jain', img: 'https://old.iittp.ac.in/images/demo/iit/SureshPP.JPG' },
    { name: 'Dr.Ramakrishna gorthi', img: 'https://old.iittp.ac.in/images/demo/iit/SubramanyamSai.JPG' },
    { name: 'Dr.Subramanyam gorthi', img: 'https://old.iittp.ac.in/images/demo/iit/gorti.jpg' },
  ];

  return (
    <section className="bg-black py-20 px-5 md:px-10">
      <div className="max-w-4xl mx-auto">
        <BentoTilt className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-xl p-6 md:p-10">
          <div className="text-white text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Guiding Professors</h2>
            <p className="opacity-80">We thank our professors for their invaluable guidance</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
            {professors.map((prof, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={prof.img}
                  alt={prof.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <p className="mt-3 text-white font-semibold text-lg text-center">{prof.name}</p>
              </div>
            ))}
          </div>
        </BentoTilt>
      </div>
    </section>
  );
};

export default ProfessorsCard;
