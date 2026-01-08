import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant }) => {
  const { name, description, images, id } = plant;
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!images?.length) return;
    const interval = setInterval(() => {
      setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      onClick={() => navigate(`/plants/${id}`)}
      className="cursor-pointer bg-white dark:bg-green-900 shadow-lg rounded-xl overflow-hidden hover:scale-105 transition"
    >
      <div className="relative h-56">
        <img
          src={images[currentIndex]}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-green-700 dark:text-green-300">
          {name}
        </h3>
        <p className="text-gray-700 dark:text-gray-200 text-sm mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PlantCard;
