import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 my-24 w-full
      bg-gradient-to-br from-black via-[#0a0014] to-black 
      relative py-16"
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
          Powerful AI Tools
        </h2>
        <p
          className="text-gray-400 max-w-lg mx-auto mt-2"
          style={{
            textShadow:
              "0 0 5px rgba(167,139,250,0.5), 0 0 10px rgba(236,72,153,0.3)",
          }}
        >
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap mt-12 justify-center gap-6">
        {AiToolsData.map((tool, index) => (
          <div key={index} className="relative group w-full sm:w-1/2 lg:w-1/4">
            {/* Animated Gradient Glow */}
            <div className="absolute inset-0 rounded-2xl blur-3xl opacity-30 
                            animate-gradientGlow group-hover:opacity-70 transition-opacity duration-500"></div>

            {/* Card */}
            <div
              className="relative p-8 m-4 rounded-2xl
              bg-black/40 backdrop-blur-xl
              border border-white/10 shadow-lg
              transition-all duration-500 cursor-pointer
              transform-gpu hover:-translate-y-2 hover:rotate-1 hover:scale-105 hover:shadow-[0_0_20px_#a855f7,0_0_30px_#ec4899]"
              onClick={() => {
                if (user) {
                  navigate(tool.path);
                } else {
                  openSignIn();
                }
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl mb-6"
                style={{
                  background: `linear-gradient(to bottom,${tool.bg.from},${tool.bg.to})`,
                }}
              >
                <tool.Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{tool.title}</h3>
              <p className="text-gray-400 text-sm">{tool.description}</p>
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

export default AiTools;
