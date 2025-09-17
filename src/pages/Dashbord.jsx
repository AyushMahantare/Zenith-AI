import React, { useEffect, useState } from 'react';
import { dummyCreationData, assets } from '../assets/assets';
import { Gem, Sparkle, Image, X } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setCreations(dummyCreationData);
  }, []);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const generatedImages = [assets.ninja, assets.portrait, assets.cityscape, assets.sunset];

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <div className="relative h-full overflow-y-scroll p-6 bg-black/90">
      {/* Top Stats */}
      <div className="flex flex-wrap gap-6">
        {[{
          title: 'Total Creations',
          value: creations.length,
          icon: <Sparkle className="w-6 text-cyan-300" />,
          bg: 'bg-cyan-500/20',
          textColor: 'text-cyan-200',
          shadow: 'shadow-[0_0_12px_rgba(0,255,255,0.6)] hover:shadow-[0_0_20px_rgba(0,255,255,0.9)]'
        },{
          title: 'Active Plan',
          value: <Protect plan="premium" fallback="Free">Premium</Protect>,
          icon: <Gem className="w-6 text-pink-300" />,
          bg: 'bg-pink-500/20',
          textColor: 'text-pink-200',
          shadow: 'shadow-[0_0_12px_rgba(255,0,255,0.6)] hover:shadow-[0_0_20px_rgba(255,0,255,0.9)]'
        }].map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            variants={itemVariants}
            className={`group relative flex justify-between items-center w-72 p-5 px-6 bg-black/70 backdrop-blur-xl rounded-2xl ${item.shadow} transform-gpu hover:rotate-1 hover:-rotate-x-2 hover:scale-[1.03]`}
          >
            <div className={item.textColor}>
              <p className="text-sm opacity-80">{item.title}</p>
              <h2 className="text-2xl font-semibold text-white">{item.value}</h2>
            </div>
            <div className={`w-12 h-12 rounded-xl ${item.bg} flex justify-center items-center`}>
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Creations */}
      <div className="mt-8 space-y-6">
        <p className="text-lg font-semibold text-white/90">Recent Creations</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creations.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={itemVariants}
            >
              <CreationItem item={item} />
            </motion.div>
          ))}

          {/* Generated Images */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={itemVariants}
            className="relative group p-6 bg-black/70 backdrop-blur-xl rounded-2xl shadow-[0_0_12px_rgba(255,255,0,0.6)] hover:shadow-[0_0_20px_rgba(255,255,0,0.9)] cursor-pointer transform-gpu hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Images Generated</h3>
              <Image className="w-6 h-6 text-yellow-300" />
            </div>
            <p className="text-gray-400 text-sm mb-4">Click on an image to preview it</p>
            <div className="grid grid-cols-2 gap-2">
              {generatedImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Generated ${i + 1}`}
                  className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="relative max-w-3xl w-full mx-4">
            <button
              className="absolute top-4 right-4 text-white z-50"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
