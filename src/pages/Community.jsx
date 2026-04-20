import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { dummyPublishedCreationData } from "../assets/assets";
// import { useUser } from "@clerk/clerk-react"; // uncomment if using clerk

const Community = () => {
  const [creations, setCreations] = useState([]);

  // TEMP fallback (if no auth)
  const user = { id: "demo-user" };

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  // particles (Zenith style)
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative h-full overflow-y-scroll p-6 bg-gradient-to-b from-black via-[#0a0014] to-black">

      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
            transition={{
              delay: p.delay,
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute rounded-full bg-purple-500"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.y}%`,
              left: `${p.x}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
        Community Creations
      </h1>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creations.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-lg hover:border-purple-500/40 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={item.content}
                alt=""
                className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Image overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col gap-2">
              <p className="text-gray-300 text-sm line-clamp-2">
                {item.prompt}
              </p>

              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-400 text-sm">
                  {item.likes.length} {item.likes.length === 1 ? "like" : "likes"}
                </p>

                <motion.div whileTap={{ scale: 1.3 }}>
                  <Heart
                    className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                      item.likes.includes(user.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Community;