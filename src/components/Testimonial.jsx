import React from "react";
import { motion } from "framer-motion";

const Testimonial = () => {
  const data = [
    {
      name: "John",
      text: "Amazing AI tools!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jane",
      text: "Boosted productivity!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Mike",
      text: "Best experience ever!",
      img: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  ];

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 bg-gradient-to-br from-black via-[#0a0014] to-black">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-[40px] font-semibold bg-gradient-to-r from-purple-500 via-pink-300 to-purple-500 bg-clip-text text-transparent">
          What Users Say
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 
            transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_12px_#a855f7]">

              {/* USER IMAGE */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.img}
                  className="w-12 h-12 rounded-full object-cover border border-purple-500"
                />
                <div>
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-purple-400 text-xs">Verified User</p>
                </div>
              </div>

              {/* TEXT */}
              <p className="text-gray-300 text-sm leading-relaxed">
                “{item.text}”
              </p>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;