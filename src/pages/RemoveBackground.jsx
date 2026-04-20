import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image } from 'lucide-react';
import { useAuth } from "@clerk/clerk-react";

const RemoveBackground = () => {
  const { getToken } = useAuth();

  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slider, setSlider] = useState(50); // percentage

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // 📤 Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setInputImage(imageUrl);
  };

  // 🚀 CALL BACKEND
  const handleRemoveBG = async () => {
    if (!inputImage) return;

    try {
      setLoading(true);
      setOutputImage("");

      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/ai/remove-background", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setOutputImage(data.image);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔽 Download function
  const downloadImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "removed-bg.png";
    link.click();
  };

  // ✨ particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative h-full overflow-y-scroll p-6 flex flex-wrap gap-8 justify-center bg-gradient-to-b from-black via-[#0a0014] to-black">

      {/* Background animation */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
            transition={{ delay: p.delay, duration: 6, repeat: Infinity }}
            className="absolute rounded-full bg-purple-500"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.y}%`,
              left: `${p.x}%`,
            }}
          />
        ))}
      </div>

      {/* Hidden input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* LEFT CARD */}
      <div className="w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border rounded-2xl text-white z-10">

        <div className="flex items-center gap-2">
          <Upload />
          <h1 className="text-xl">Background Remover</h1>
        </div>

        {inputImage && (
          <img src={inputImage} className="mt-4 rounded max-h-[200px]" />
        )}

        {/* Upload */}
        <button
          onClick={handleButtonClick}
          className="w-full mt-4 bg-purple-500 py-2 rounded"
        >
          Upload Image
        </button>

        {/* Process */}
        <button
          onClick={handleRemoveBG}
          className="w-full mt-4 bg-pink-500 py-2 rounded"
        >
          {loading ? "Processing..." : "Remove Background"}
        </button>

      </div>

      {/* RIGHT CARD */}
      <div className="w-full max-w-lg p-6 bg-black/20 rounded-2xl text-white text-center z-10">

        <h2 className="text-xl mb-4 flex justify-center gap-2">
          <Image /> Result
        </h2>

       {loading ? (
  <p className="animate-pulse text-purple-400">
    🤖 Removing background...
  </p>
) : outputImage && inputImage ? (
  <div className="relative w-full max-w-md overflow-hidden rounded-lg">

    {/* BEFORE (original) */}
    <img
      src={inputImage}
      className="w-full h-full object-cover"
    />

    {/* AFTER (overlay) */}
    <div
      className="absolute top-0 left-0 h-full overflow-hidden"
      style={{ width: `${slider}%` }}
    >
      <img
        src={outputImage}
        className="w-full h-full object-cover"
      />
    </div>

    {/* SLIDER LINE */}
    <div
      className="absolute top-0 h-full w-1 bg-white cursor-ew-resize"
      style={{ left: `${slider}%` }}
    />

    {/* RANGE INPUT */}
    <input
      type="range"
      min="0"
      max="100"
      value={slider}
      onChange={(e) => setSlider(e.target.value)}
      className="absolute bottom-2 left-0 w-full"
    />
  </div>
) : (
  <p className="text-gray-400">
    Upload image and click remove
  </p>
)}
      </div>
    </div>
  );
};

export default RemoveBackground;