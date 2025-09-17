import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import bgVideo from '../assets/bgVideo.mp4';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { assets } from '../assets/assets';

const Hero = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Smooth floating animation (Spline)
  const floatAnim = {
    hidden: { opacity: 0, y: 40, rotate: 0 },
    visible: {
      opacity: 1,
      y: [0, -20, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",   // makes the loop soft
        ease: "easeInOut",
      },
    },
  };

  // Smooth floating animation (h1 heading)
  const headingFloat = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full min-h-screen px-4 sm:px-10 md:px-20 xl:px-32 flex flex-col justify-center items-center overflow-hidden">

      {/* Background Video */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Black Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-0"></div>

      {/* Floating Spline */}
      <motion.div
        variants={floatAnim}
        initial="hidden"
        animate="visible"
        className="absolute bottom-2 right-2 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 xl:w-96 xl:h-96 pointer-events-none z-10"
      >
        {loading && (
          <div className="text-white text-center text-xs sm:text-sm">Loading 3D...</div>
        )}
        <Spline
          scene="https://prod.spline.design/VGkoJTRi3hE2EVUw/scene.splinecode"
          onLoad={() => setLoading(false)}
        />
      </motion.div>

      {/* Text Content */}
      <div className="relative z-20 text-center text-white max-w-3xl w-full px-2 sm:px-4">

        {/* Glass Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="px-4 sm:px-6 py-6 sm:py-8 rounded-2xl inline-block glass-effect w-full sm:w-auto"
        >
          <motion.h1
            variants={headingFloat}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-medium mx-auto leading-snug heading-glow"
            style={{ fontFamily: "'Doto', sans-serif" }}
          >
            Create amazing content <br className="hidden sm:block"/> with{" "}
            <span className="text-purple-400 font-medium" style={{ fontFamily: "'Doto', sans-serif" }}>
              AI tools
            </span>
          </motion.h1>

          <p
            className="mt-3 sm:mt-4 max-w-xs sm:max-w-lg lg:max-w-xl m-auto text-xs sm:text-sm md:text-base paragraph-glow"
            style={{ fontFamily: "'Libertinus', sans-serif" }}
          >
            Transform your content creation with our suite of premium AI tools.
            Write articles, generate images, and enhance your workflow.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base mt-6"
        >
          <button
            onClick={() => navigate('/ai')}
            className="bg-transparent font-extrabold text-white px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer glow-btn border-purple-400 border-2"
            style={{ fontFamily: "'Doto', sans-serif" }}
          >
            Start Creating Now
          </button>
          <button
            className="bg-transparent font-extrabold text-purple-300 px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-lg border border-gray-50 hover:scale-105 active:scale-95 transition cursor-pointer glow-btn"
            style={{ fontFamily: "'Doto', sans-serif" }}
          >
            Watch Demo
          </button>
        </motion.div>

        {/* Trusted Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className="flex items-center gap-2 sm:gap-4 mt-6 sm:mt-8 mx-auto text-gray-200 justify-center text-xs sm:text-sm md:text-base"
          style={{ fontFamily: "'Doto', sans-serif" }}
        >
          <img src={assets.user_group} alt="user group" className="h-6 sm:h-8" />
          <span>Trusted by 10K people</span>
        </motion.div>
      </div>

      {/* Glow + Glass Styles */}
      <style>
        {`
          .glass-effect {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          }

          @keyframes glowHover {
            0%, 100% {
              box-shadow: 0 0 5px #a78bfa, 0 0 10px #c4b5fd, 0 0 15px #9333ea;
            }
            50% {
              box-shadow: 0 0 10px #c4b5fd, 0 0 15px #9333ea, 0 0 20px #a78bfa;
            }
          }

          .glow-btn:hover {
            animation: glowHover 1.5s infinite ease-in-out;
          }
          .glow-btn:active {
            box-shadow: 0 0 20px #c4b5fd, 0 0 25px #9333ea, 0 0 30px #a78bfa;
          }

          @keyframes headingGlow {
            0%, 100% {
              text-shadow: 0 0 6px rgba(255,255,255,0.6),
                           0 0 12px rgba(167,139,250,0.5),
                           0 0 18px rgba(147,51,234,0.4);
            }
            50% {
              text-shadow: 0 0 10px rgba(255,255,255,0.8),
                           0 0 20px rgba(167,139,250,0.6),
                           0 0 30px rgba(147,51,234,0.5);
            }
          }
          .heading-glow {
            animation: headingGlow 3s infinite ease-in-out;
          }

          @keyframes paragraphGlow {
            0%, 100% {
              text-shadow: 0 0 3px rgba(255,255,255,0.5),
                           0 0 6px rgba(167,139,250,0.4);
            }
            50% {
              text-shadow: 0 0 6px rgba(255,255,255,0.7),
                           0 0 12px rgba(167,139,250,0.5);
            }
          }
          .paragraph-glow {
            animation: paragraphGlow 4s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
