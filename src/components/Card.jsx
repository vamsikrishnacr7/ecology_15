import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <div className="card w-72 bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </div>
  );
};

export default Card;