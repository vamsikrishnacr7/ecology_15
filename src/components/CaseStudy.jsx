import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const CaseStudy = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const item = state?.item;
  const [typedContent, setTypedContent] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(true);
  const speechRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { margin: "-20% 0px -20% 0px" });

  // Initialize speech synthesis
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel(); // Cleanup on unmount
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!item?.fullContent || !isInView) return;

    let i = 0;
    const fullText = item.fullContent;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedContent(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 15);

    return () => clearInterval(typingInterval);
  }, [item?.fullContent, isInView]);

  // Handle speech enable/disable
  const handleSpeech = (enable) => {
    setShowAudioPrompt(false);
    if (enable) {
      startSpeech();
    }
  };

  // Start speech function (reusable)
  const startSpeech = () => {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(item.fullContent);
    utterance.rate = 0.92;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Toggle speech
  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
    } else {
      startSpeech(); // Start new speech if not paused
    }
  };

  if (!item) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12 text-center"
    >
      Case study not found.
    </motion.div>
  );

  return (
    <motion.div className="flex justify-center">
      <motion.div
        className="container px-4 py-12 max-w-4xl relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Audio Prompt Popup */}
        {showAudioPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 bg-white shadow-xl rounded-lg p-4 z-50 max-w-xs border border-gray-200"
          >
            <p className="mb-3 font-medium">Enable voice narration?</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleSpeech(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Yes, please
              </button>
              <button
                onClick={() => handleSpeech(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1 
          className="text-2xl sm:text-4xl font-bold mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {item.title}
        </motion.h1>

        {/* Image with voice control */}
        <motion.div
          className="relative overflow-hidden rounded-lg mb-8 shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-96 object-cover"
          />
          {!showAudioPrompt && (
            <button 
              onClick={toggleSpeech}
              className={`absolute bottom-4 right-4 p-3 rounded-full transition-all ${isSpeaking ? 'bg-blue-600' : 'bg-black/80 hover:bg-blue-600'} text-white`}
              aria-label={isSpeaking ? "Pause narration" : "Play narration"}
            >
              {isSpeaking ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          )}
        </motion.div>

        {/* Content */}
        <div ref={contentRef} className="text-gray-700 space-y-4">
          <p className="text-lg mb-4 font-medium">
            {item.description}
          </p>
          <div className="prose max-w-none relative min-h-[200px]">
            {typedContent}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-1"
            >
              {typedContent.length < item.fullContent.length ? "|" : ""}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CaseStudy;