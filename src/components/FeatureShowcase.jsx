import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const userCreations = [
  { img: assets.sunset, title: "Sunset", user: "Alice" },
  { img: assets.cityscape, title: "Cityscape", user: "Bob" },
  { img: assets.portrait, title: "Portrait", user: "Charlie" },
  { img: assets.ninja, title: "Ninja Art", user: "David" },
];

const FeatureShowcase = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 bg-gradient-to-br from-black via-[#0a0014] to-black">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-[40px] font-semibold bg-gradient-to-r from-purple-500 via-pink-300 to-purple-500 bg-clip-text text-transparent">
          Amazing Creations
        </h2>
      </motion.div>

     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {userCreations.map((item, i) => (
    <motion.div
      key={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 
      transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03]">

        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={item.img}
            className="w-full h-56 object-cover rounded-xl"
          />
        </div>

        {/* TEXT */}
        <div className="mt-4">
          <h3 className="text-white font-semibold">{item.title}</h3>
          <p className="text-purple-400 text-sm mt-1">by {item.user}</p>
        </div>

      </div>
    </motion.div>
  ))}
</div>
    </div>
  );
};

export default FeatureShowcase;