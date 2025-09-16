import React from "react";
import { assets } from "../assets/assets";

const userCreations = [
  {
    img: assets.sunset,
    title: "Sunset Over Mountains",
    tool: "AI Image Generation",
    user: "Alice",
  },
  {
    img: assets.cityscape,
    title: "Futuristic Cityscape",
    tool: "AI Image Generation",
    user: "Bob",
  },
  {
    img: assets.portrait,
    title: "AI Art Portrait",
    tool: "AI Image Generation",
    user: "Charlie",
  },
  {
    img: assets.ninja,
    title: "Ninja Holding Blade with Aesthetic Background",
    tool: "AI Image Generation",
    user: "David",
  },
];

const FeatureShowcase = () => {
  return (
    <div
      className="px-4 sm:px-20 xl:px-32 py-24 w-full
        bg-gradient-to-br from-black via-[#0a0014] to-black relative"
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2
          className="text-[42px] font-semibold text-transparent bg-clip-text 
                     bg-gradient-to-r from-purple-600 via-pink-200 to-purple-600"
          style={{
            textShadow:
              "0 0 8px rgba(255, 0, 255, 0.7), 0 0 16px rgba(255, 105, 180, 0.5)",
          }}
        >
          Amazing Creations by Our Users
        </h2>
        <p
          className="text-gray-400 mt-2 max-w-lg mx-auto"
          style={{
            textShadow:
              "0 0 5px rgba(167,139,250,0.5), 0 0 10px rgba(236,72,153,0.3)",
          }}
        >
          See what’s possible with our AI tools and get inspired
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6">
        {userCreations.map((item, index) => (
          <div key={index} className="relative group w-full sm:w-1/2 lg:w-1/4">
            {/* Animated Gradient Glow */}
            <div className="absolute inset-0 rounded-2xl blur-3xl opacity-30 
                            animate-gradientGlow group-hover:opacity-70 transition-opacity duration-500"></div>

            {/* Card */}
            <div
              className="relative p-4 rounded-2xl
              bg-black/40 backdrop-blur-xl
              border border-white/10 shadow-lg
              transition-all duration-500 cursor-pointer
              transform-gpu hover:-translate-y-2 hover:rotate-1 hover:scale-105 hover:shadow-[0_0_20px_#a855f7,0_0_30px_#ec4899]"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover object-top rounded-xl hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="mt-4">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{item.tool}</p>
                <p className="text-purple-400 text-sm mt-1 font-medium">
                  by {item.user}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Gradient Glow Style */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animate-gradientGlow {
            background: linear-gradient(270deg, #a855f7, #ec4899, #f472b6, #7c3aed);
            background-size: 600% 600%;
            animation: gradientShift 10s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default FeatureShowcase;
