import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

const yearRange = Array.from({ length: 8 }, (_, i) => 2016 + i);

// Local image paths
const areaImages = [
  Array.from({ length: 8 }, (_, i) => `/img/Building_Presence_${16 + i}_1.png`),
  Array.from({ length: 8 }, (_, i) => `/img/Building_Presence_${16 + i}_2.png`),
  Array.from({ length: 8 }, (_, i) => `/img/Building_Presence_${16 + i}_3.png`),
  Array.from({ length: 8 }, (_, i) => `/img/Building_Presence_${16 + i}_4.png`),
];

// ML prediction images for 2024
const predictionImages = [
  `/img/Building_Presencepredicted_24_1.png`,
  `/img/Building_Presencepredicted_24_2.png`,
  `/img/Building_Presencepredicted_24_3.png`,
  `/img/Building_Presencepredicted_24_4.png`,
];

// Occupancy percentages mapped [block][yearIndex]
const buildingPercentages = [
  ["4.47%", "4.71%", "4.85%", "4.96%", "4.83%", "4.93%", "4.78%", "4.90%"],
  ["52.52%", "52.80%", "54.56%", "54.90%", "55.54%", "56.84%", "56.91%", "57.21%"],
  ["23.80%", "24.48%", "26.35%", "27.44%", "28.10%", "28.74%", "28.91%", "29.35%"],
  ["49.79%", "50.84%", "54.06%", "55.19%", "56.32%", "57.66%", "58.01%", "58.40%"],
];

// Predicted percentages for 2024
const predictedPercentages = ["5.10%", "58.10%", "30.20%", "59.12%"];

// CV Index values for 2016-2023 and predicted 2024
const cvIndexData = [
  ["0.2680", "0.3996", "0.2131", "0.2670", "0.1929"],
  ["0.2348", "0.3259", "0.1988", "0.2296", "0.1656"],
  ["0.2486", "0.3242", "0.1988", "0.2583", "0.1888"],
  ["0.1863", "0.2249", "0.1779", "0.1829", "0.1431"],
  ["0.2714", "0.3566", "0.2157", "0.2732", "0.1919"],
  ["0.2586", "0.3690", "0.2101", "0.2516", "0.1803"],
  ["0.2918", "0.4266", "0.2147", "0.3038", "0.2025"],
  ["0.3144", "0.3983", "0.2364", "0.3205", "0.2188"],
];

// Predicted CV Index for 2024
const predictedCvIndex = ["0.3493", "0.4637", "0.3003", "0.3535", "0.339"];

// SES Index values for 2024
const sesIndex = [23.19, 63.03, 57.65, 64.45]; // SES Index for areas 1, 2, 3, 4

// Canopy Percentage for 2024
// const canopyPercentage = ["45%", "62%", "56%", "60%"];

export default function CityMapExplorer() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [futureView, setFutureView] = useState(false);
  const [displayPrediction, setDisplayPrediction] = useState(false);

  const handleClick = (index) => {
    setLoading(true);
    setSelected(null);
    setDisplayPrediction(false);
    gsap.fromTo(".ml-text", { opacity: 0 }, { opacity: 1, duration: 1 });
    setTimeout(() => {
      setLoading(false);
      setSelected(index);
    }, 2500);
  };

  const handleBack = () => {
    setFutureView(false);
    setSelected(null);
    setDisplayPrediction(false);
  };

  const handleFutureBack = () => {
    setFutureView(false);
    setDisplayPrediction(false);
  };

  const handleFuturePrediction = () => {
    setLoading(true);
    setDisplayPrediction(true);
    gsap.fromTo(".ml-text", { opacity: 0 }, { opacity: 1, duration: 1 });
    setTimeout(() => {
      setLoading(false);
      setFutureView(true);
    }, 2500);
  };

  const positions = [
    { x: "25%", y: "25%" },
    { x: "75%", y: "25%" },
    { x: "25%", y: "75%" },
    { x: "75%", y: "75%" },
  ];

  const isSesLow = (index) => sesIndex[index] < 50; // Check if SES Index is less than 50%

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <h1 className="text-4xl font-bold text-center mb-10">Tirupati City</h1>

      {!selected && (
        <div className="relative w-full max-w-5xl mx-auto">
          <img
            src="/img/Building_Presence_2016_Colored.png"
            alt="City Map"
            className="w-full rounded-xl shadow-lg"
          />
          {positions.map((pos, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: `calc(${pos.x} - 10px)`, top: `calc(${pos.y} - 10px)` }}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleClick(index)}
            >
              <div className="w-5 h-5 bg-indigo-500 rounded-full cursor-pointer shadow-xl border border-white animate-pulse" />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card px-10 py-8 rounded-2xl border border-white/30 text-center backdrop-blur-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h2 className="ml-text text-4xl font-bold text-indigo-300 tracking-widest animate-pulse">
                {displayPrediction ? "ML PREDICTION" : "HISTORICAL DATA"}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && selected !== null && !futureView && (
        <motion.div
          className="mt-12 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-indigo-300">
              Block {selected + 1} – Area Evolution (2016–2023)
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-indigo-600 px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
              onClick={handleBack}
            >
              ← Back to Map
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {yearRange.map((year, i) => (
              <motion.div
                key={year}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800 p-2 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <img
                  src={areaImages[selected][i]}
                  alt={`Year ${year}`}
                  className="rounded-xl w-full h-48 object-cover mb-2 border-2 border-indigo-500"
                />
                <p className="text-center text-sm text-gray-300">{year}</p>
                <p className="text-center text-xs text-indigo-300">
                  Occupancy: {buildingPercentages[selected][i]}
                </p>
                {/* Vegetation Index Text */}
                <p className="text-center text-xs text-green-300 mt-2">
                  Vegetation Index: {cvIndexData[i][selected]}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition-all"
              onClick={handleFuturePrediction}
            >
              Predict Future Pattern
            </button>
          </div>
        </motion.div>
      )}

      {!loading && selected !== null && futureView && (
        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-indigo-300 mb-8">
            Predicted Future Data for 2024
          </h2>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl text-indigo-300">Occupancy in 2024</p>
                <p className="text-3xl font-semibold text-gray-300">
                  {predictedPercentages[selected]}
                </p>
              </div>
              <div>
                <p className="text-xl text-indigo-300">Vegetation Index</p>
                <p className="text-3xl font-semibold text-green-300">
                  {predictedCvIndex[selected]}
                </p>
              </div>
            </div>

            {/* Display the SES Index and Canopy Percentage */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl text-indigo-300">SES Index</p>
                <p className={`text-3xl font-semibold ${isSesLow(selected) ? "text-red-400" : "text-green-300"}`}>
                  {sesIndex[selected]}%
                </p>
              </div>
              <div>
                {/* <p className="text-xl text-indigo-300">Canopy Percentage</p>
                <p className="text-3xl font-semibold text-green-300">
                  {canopyPercentage[selected]}
                </p> */}
              </div>
            </div>

            {/* Display Prediction Image with red overlay for low SES */}
            <div className={`relative mt-8`}>
              <img
                src={predictionImages[selected]}
                alt={`Predicted Image for Block ${selected + 1}`}
                className="rounded-xl w-full"
              />
              {isSesLow(selected) && (
                <div className="absolute inset-0 bg-red-500 opacity-30"></div>
              )}
            </div>

            <div className="mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-600 px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
                onClick={handleFutureBack}
              >
                ← Back to Historical Data
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
