import React, { useEffect, useState, useRef } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkle } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const loaderRef = useRef(null);

  useEffect(() => {
    setCreations(dummyCreationData);
  }, []);

  // Infinite scroll: observe loader
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 8, creations.length));
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [creations]);

  // Soft fade + futuristic float
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.07,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Particle background
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative h-full overflow-y-scroll p-6 bg-gradient-to-b from-black via-[#0a0014] to-black">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -30, 0] }}
            transition={{
              delay: p.delay,
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-purple-500"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.y}%`,
              left: `${p.x}%`,
              filter: "blur(2px)",
              boxShadow: "0 0 10px #a855f7, 0 0 20px #6366f1",
            }}
          />
        ))}
      </div>

      {/* Top Stats */}
      <div className="flex flex-wrap gap-6 relative z-10">
        {[
          {
            title: "Total Creations",
            value: creations.length,
            icon: <Sparkle className="w-6 text-cyan-300" />,
            bg: "bg-cyan-500/20",
            textColor: "text-cyan-200",
            shadow:
              "shadow-[0_0_15px_rgba(0,255,255,0.6)] hover:shadow-[0_0_25px_rgba(0,255,255,0.9)]",
          },
          {
            title: "Active Plan",
            value: (
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            ),
            icon: <Gem className="w-6 text-pink-300" />,
            bg: "bg-pink-500/20",
            textColor: "text-pink-200",
            shadow:
              "shadow-[0_0_15px_rgba(255,0,255,0.6)] hover:shadow-[0_0_25px_rgba(255,0,255,0.9)]",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            variants={itemVariants}
            whileHover={{ scale: 1.08, y: -6 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`group relative flex justify-between items-center w-72 p-5 px-6 bg-black/70 backdrop-blur-xl rounded-2xl ${item.shadow}`}
          >
            <div className={item.textColor}>
              <p className="text-sm opacity-80">{item.title}</p>
              <h2 className="text-2xl font-semibold text-white">
                {item.value}
              </h2>
            </div>
            <div
              className={`w-12 h-12 rounded-xl ${item.bg} flex justify-center items-center`}
            >
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Creations */}
      <div className="mt-8 space-y-6 relative z-10">
        <p className="text-lg font-semibold text-white/90">Recent Creations</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creations.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -6,
                boxShadow:
                  "0 0 20px rgba(168,85,247,0.7), 0 0 40px rgba(79,70,229,0.6)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="rounded-2xl overflow-hidden"
            >
              <CreationItem item={item} />
            </motion.div>
          ))}
        </div>

        {/* Infinite Scroll Loader */}
        {visibleCount < creations.length && (
          <div ref={loaderRef} className="flex justify-center mt-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
