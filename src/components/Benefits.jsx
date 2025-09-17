import React from "react";
import { motion } from "framer-motion";

const benefits = [
  { title: "Article Generation", description: "Generate high-quality, ATS-friendly articles.", gradient: "linear-gradient(90deg, #FF6EC7, #9333EA)" },
  { title: "Resume Review", description: "Get your resume optimized for ATS and recruiters.", gradient: "linear-gradient(90deg, #3B82F6, #06B6D4)" },
  { title: "Blog Titles", description: "Create catchy, SEO-friendly blog titles instantly.", gradient: "linear-gradient(90deg, #FACC15, #F97316)" },
  { title: "Object Removal", description: "Remove unwanted objects from images easily.", gradient: "linear-gradient(90deg, #10B981, #059669)" },
  { title: "Background Removal", description: "Remove backgrounds from images with AI precision.", gradient: "linear-gradient(90deg, #EF4444, #B91C1C)" },
  { title: "Image Generation", description: "Create stunning AI-generated images in seconds.", gradient: "linear-gradient(90deg, #8B5CF6, #EC4899)" },
];

const Benefits = () => {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 w-full bg-gradient-to-br from-black via-[#0a0014] to-black relative">
      
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2
          className="text-[42px] font-semibold"
          style={{
            background: "linear-gradient(90deg, #a855f7, #ec4899, #f472b6, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 8px rgba(255, 0, 255, 0.7), 0 0 16px rgba(255, 105, 180, 0.5)",
          }}
        >
          Why Our AI Tools are Exceptional
        </h2>
        <p
          className="text-gray-400 max-w-lg mx-auto mt-2"
          style={{ textShadow: "0 0 5px rgba(167,139,250,0.5), 0 0 10px rgba(236,72,153,0.3)" }}
        >
          Explore the features that make our platform perfect for content creators, bloggers, and designers.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="relative group w-full"
            variants={cardVariants}
          >
            {/* Neon Animated Gradient Background */}
            <div className="absolute inset-0 rounded-2xl blur-3xl opacity-30 animate-gradientGlow group-hover:opacity-70 transition-opacity duration-500"></div>

            {/* Card with Neon Glow on Hover */}
            <motion.div
              className="relative p-6 m-2 rounded-2xl
                         bg-black/40 backdrop-blur-xl
                         border border-white/10 shadow-lg
                         transition-all duration-500 cursor-pointer
                         transform-gpu hover:-translate-y-2 hover:rotate-1 hover:scale-105
                         hover:shadow-[0_0_20px_#a855f7,0_0_30px_#ec4899]"
              variants={textVariants} // text animates independently inside card
              whileHover={{ 
                boxShadow: "0 0 30px #a855f7, 0 0 40px #ec4899, 0 0 50px #f472b6", 
                transition: { duration: 0.5, ease: "easeInOut" } 
              }}
            >
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  background: benefit.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Gradient Glow CSS */}
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

export default Benefits;
