import React from "react";
import { motion } from "framer-motion";

const benefits = [
  { title: "Article Generation", description: "Generate high-quality, ATS-friendly articles.", gradient: "linear-gradient(90deg, #FF6EC7, #9333EA)" },
  { title: "Resume Review", description: "Optimize resume for ATS.", gradient: "linear-gradient(90deg, #3B82F6, #06B6D4)" },
  { title: "Blog Titles", description: "Create SEO-friendly titles instantly.", gradient: "linear-gradient(90deg, #FACC15, #F97316)" },
  { title: "Object Removal", description: "Remove objects from images.", gradient: "linear-gradient(90deg, #10B981, #059669)" },
  { title: "Background Removal", description: "Remove backgrounds easily.", gradient: "linear-gradient(90deg, #EF4444, #B91C1C)" },
  { title: "Image Generation", description: "Generate AI images instantly.", gradient: "linear-gradient(90deg, #8B5CF6, #EC4899)" },
];

const Benefits = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 bg-gradient-to-br from-black via-[#0a0014] to-black">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-[40px] font-semibold bg-gradient-to-r from-purple-500 via-pink-300 to-purple-500 bg-clip-text text-transparent">
          Why Our AI Tools are Exceptional
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto mt-2">
          Features designed for creators and developers.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_12px_#a855f7]">
              <h3
                className="text-lg font-semibold mb-2"
                style={{
                  background: item.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;