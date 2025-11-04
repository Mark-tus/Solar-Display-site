import React, { useState, useEffect } from "react";

const PlantCard = ({ plant }) => {
  const { name, description, images } = plant;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // change every 2.5s

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="bg-white dark:bg-green-900 shadow-lg rounded-xl p-4 text-center">
        <h3 className="text-lg font-bold text-green-700 dark:text-green-300">{name}</h3>
        <p className="text-gray-700 dark:text-gray-200 text-sm mt-2">{description}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-green-900 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={name}
          className="object-cover w-full h-full transition-all duration-700"
        />
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex
                  ? "bg-green-500"
                  : "bg-gray-300 dark:bg-green-700"
              }`}
            ></div>
          ))}
        </div>
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
