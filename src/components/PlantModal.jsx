

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";

const PlantModal = ({ plant, onClose }) => {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  if (!plant) return null;
  const images = plant.images || [];

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  /* 🔑 Keyboard controls */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        zoomed ? setZoomed(false) : onClose();
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zoomed]);

  /* 📱 Swipe */
  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 text-white max-w-6xl w-full rounded-xl relative overflow-hidden"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl hover:text-red-400 z-20"
          >
            ✕
          </button>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* IMAGE / CAROUSEL */}
            <div {...swipeHandlers} className="relative bg-black rounded-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={index}
                  src={images[index]}
                  alt={plant.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setZoomed(true)}
                  className="w-full h-[320px] md:h-[420px] object-contain rounded-lg cursor-zoom-in"
                />
              </AnimatePresence>

              {/* Prev / Next */}
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl"
              >
                ‹
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl"
              >
                ›
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                      i === index ? "bg-green-400" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* INFO PANEL */}
            <div>
              <h2 className="text-2xl font-bold text-green-300 mb-2">
                {plant.name}
              </h2>

              <p className="text-gray-300">📍 {plant.location}</p>
              <p className="text-gray-300 mb-4">⚡ {plant.capacity}</p>

              <div className="bg-gray-800 rounded-lg p-4 mt-4">
                <h3 className="font-semibold text-green-400 mb-2">
                  Plant Details
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {plant.description}
                </p>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                💡 Tip: Click image to zoom · Use ← → keys · Swipe on mobile
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🔍 ZOOM OVERLAY */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
          >
            <motion.img
              src={images[index]}
              alt="Zoomed"
              className="max-w-full max-h-full object-contain cursor-zoom-out"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlantModal;
