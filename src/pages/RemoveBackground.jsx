import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image } from 'lucide-react';

const RemoveBackground = () => {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setInputImage(imageUrl);

    setLoading(true);

    // Dummy processing (replace with API later)
    setTimeout(() => {
      setOutputImage(imageUrl);
      setLoading(false);
    }, 1500);
  };

  // SAME particles as your UI
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative h-full overflow-y-scroll p-6 flex flex-wrap gap-8 justify-center bg-gradient-to-b from-black via-[#0a0014] to-black">

      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
            transition={{
              delay: p.delay,
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-purple-500"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.y}%`,
              left: `${p.x}%`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Left Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg z-10"
      >
        <div className="flex items-center gap-3">
          <Upload className="w-6 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Background Remover
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Your Image</p>

        {inputImage && (
          <img
            src={inputImage}
            alt="preview"
            className="mt-4 rounded-lg max-h-[200px]"
          />
        )}

        {/* Toggle */}
        <div className="my-6 flex items-center gap-3">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-inner transition-all duration-500 peer-checked:from-green-400 peer-checked:to-green-600"></div>
            <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-500 ease-in-out peer-checked:translate-x-6"></span>
          </label>
          <p className="text-sm text-gray-200">Make this Image Public</p>
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff22e9] to-[#a065ff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer shadow-lg hover:shadow-[0_0_20px_#ff22e9,0_0_30px_#a065ff] transition-all duration-300"
        >
          {loading ? "Processing..." : "Upload & Remove Background"}
        </button>
      </motion.div>

      {/* Right Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col min-h-[400px] justify-center items-center z-10"
      >
        <Image className="w-16 h-16 mb-4 text-[#a855f7]" />

        <h1 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent text-center">
          Output Image
        </h1>

        {outputImage ? (
          <img
            src={outputImage}
            alt="output"
            className="rounded-xl max-h-[300px]"
          />
        ) : (
          <p className="text-center text-gray-400">
            Upload image to remove background
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default RemoveBackground;