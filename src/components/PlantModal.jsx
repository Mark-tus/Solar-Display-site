import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const PlantModal = ({ plant, onClose }) => {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const esc = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!plant) return null;

  const next = () => setIndex((index + 1) % plant.images.length);
  const prev = () => setIndex((index - 1 + plant.images.length) % plant.images.length);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={e => e.stopPropagation()}
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="bg-gray-900 text-white max-w-5xl w-full rounded-xl p-6 relative"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl hover:text-red-400"
          >
            ✕
          </button>

          {/* Info */}
          <h2 className="text-2xl font-bold text-green-300">{plant.name}</h2>
          <p className="text-gray-300">📍 {plant.location}</p>
          <p className="text-gray-300 mb-4">⚡ {plant.capacity}</p>
          <p className="text-gray-200 mb-6">{plant.description}</p>

          {/* Carousel */}
          <div {...swipeHandlers} className="relative mb-6">
            <motion.img
              key={index}
              src={plant.images[index]}
              onClick={() => setZoom(!zoom)}
              className={`rounded-lg mx-auto cursor-zoom-in transition ${
                zoom ? "scale-125" : "scale-100"
              }`}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
            />

            {/* Controls */}
            <button onClick={prev} className="absolute left-2 top-1/2 text-3xl">‹</button>
            <button onClick={next} className="absolute right-2 top-1/2 text-3xl">›</button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 justify-center">
            {plant.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setIndex(i)}
                className={`h-16 w-24 object-cover rounded cursor-pointer ${
                  i === index ? "ring-2 ring-green-400" : ""
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlantModal;
