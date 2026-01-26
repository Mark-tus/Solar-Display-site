import React, { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";

const PlantCard = ({ plant, onSelect }) => {
  // 🔹 Keeping destructuring (name/description retained but unused for now)
  const { name, description, images = [] } = plant;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  /* ===============================
     AUTO SLIDESHOW (pause on hover)
     =============================== */
  useEffect(() => {
    if (!images.length || isHovered) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev =>
        prev === images.length - 1 ? 0 : prev + 1
      );
      setIsLoaded(false);
    }, 2500);

    return () => clearInterval(intervalRef.current);
  }, [images, isHovered]);

  /* ===============================
     SWIPE GESTURES (mobile + mouse)
     =============================== */
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex(i => (i + 1) % images.length);
      setIsLoaded(false);
    },
    onSwipedRight: () => {
      setCurrentIndex(i =>
        i === 0 ? images.length - 1 : i - 1
      );
      setIsLoaded(false);
    },
    trackMouse: true
  });

  /* ===============================
     CLICK HANDLER (modal / route)
     =============================== */
  const handleClick = () => {
    if (typeof onSelect === "function") {
      onSelect(plant);
    } else {
      navigate(`/plants/${plant.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        cursor-pointer
        bg-white dark:bg-green-900
        shadow-lg rounded-xl
        overflow-hidden
        transform hover:scale-105
        transition duration-300
      "
    >
      {/* ===============================
          IMAGE AREA (IMAGE-ONLY CARD)
         =============================== */}
      <div
        {...swipeHandlers}
        className="relative h-56 w-full overflow-hidden"
      >
        {/* Skeleton Loader */}
        {!isLoaded && (
          <div className="
            absolute inset-0
            bg-gray-300 dark:bg-green-800
            animate-pulse
            z-10
          " />
        )}

        <img
          src={images[currentIndex]}
          alt={name || "Solar Plant"}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`
            object-cover w-full h-full
            transition-opacity duration-700
            ${isLoaded ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* ===============================
            DOT INDICATORS
           =============================== */}
        <div
          className="
            absolute bottom-2 left-1/2
            -translate-x-1/2 z-20
            flex gap-1 px-2 py-1
            rounded-full
            bg-black/40 backdrop-blur-sm
          "
          onClick={e => e.stopPropagation()}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsLoaded(false);
              }}
              className={`
                w-2 h-2 rounded-full
                transition-all
                ${
                  index === currentIndex
                    ? "bg-green-400 scale-110"
                    : "bg-white/70 hover:bg-white"
                }
              `}
              aria-label={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ===============================
          TEXT SECTION (REMOVED FOR NOW)
          Keeping commented for future use
         =============================== */}

      {/*
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-green-700 dark:text-green-300">
          {name}
        </h3>
        <p className="text-gray-700 dark:text-gray-200 text-sm mt-2 line-clamp-2">
          {description}
        </p>
      </div>
      */}
    </div>
  );
};

export default PlantCard;
