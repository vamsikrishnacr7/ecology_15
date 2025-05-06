import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

const VoiceAssistant = () => {
  const vapiRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize VAPI once
  useEffect(() => {
    const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY); // 🔁 Replace with actual key
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      console.log('✅ Call started');
      setIsActive(true);
    });

    vapi.on('call-end', () => {
      console.log('🛑 Call ended');
      setIsActive(false);
    });

    vapi.on('error', (err) => {
      console.error('⚠️ VAPI error:', err);
    });

    // You can preload assistant if needed:
    setIsReady(true);

    return () => {
      vapi.stop(); // cleanup on unmount
    };
  }, []);

  const toggleCall = async () => {
    const vapi = vapiRef.current;
    if (!vapi || !isReady) {
      alert('Voice assistant is not ready.');
      return;
    }

    try {
      if (isActive) {
        await vapi.stop();
      } else {
        await vapi.start(import.meta.env.VITE_ASSISTANT_ID); // 🔁 Replace with actual assistantId
      }
    } catch (error) {
      console.error('❌ Error toggling call:', error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleCall}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
          isActive
            ? 'bg-red-600 hover:bg-red-700 animate-pulse'
            : 'bg-green-600 hover:bg-green-700'
        } text-white`}
        aria-label={isActive ? "Stop voice assistant" : "Start voice assistant"}
      >
        {isActive ? <FaMicrophoneSlash size={20} /> : <FaMicrophone size={20} />}
      </button>
    </div>
  );
};

export default VoiceAssistant;
