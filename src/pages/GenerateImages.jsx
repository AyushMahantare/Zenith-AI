import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Image } from 'lucide-react';

const GenerateImages = () => {
  const imageStyle = [
    'Realistic',
    'Ghibli Style',
    'Anime Style',
    'Cartoon Style',
    'Fantasy Style',
    'Realistic Style',
    '3D Style',
    'Portrait Style',
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [publish, setPublish] = useState(false); // ✅ Added publish state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;
    // Dummy generated image text
    setGeneratedImage(
      `Generated Image for "${input}" in ${selectedStyle} style. ${
        publish ? '(Public)' : '(Private)'
      }`
    );
  };

  // Dummy particles
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

      {/* Left Column - AI Image Generator Form */}
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg z-10"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            AI Image Generator
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-lg border border-gray-400 bg-black/30 placeholder-gray-400 text-white focus:ring-1 focus:ring-purple-400"
          placeholder="Describe what you want to see in image..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 font-medium flex-wrap">
          {imageStyle.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-300 ${
                selectedStyle === item
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-[0_0_10px_#a855f7]'
                  : 'text-gray-400 border-gray-500 hover:bg-white/10 hover:text-white'
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Publish Toggle */}
       <div className="my-6 flex items-center gap-3">
  <label className="relative cursor-pointer">
    <input
      type="checkbox"
      checked={publish}
      onChange={(e) => setPublish(e.target.checked)}
      className="sr-only peer"
    />
    {/* Track */}
    <div className="w-12 h-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-inner transition-all duration-500 peer-checked:from-green-400 peer-checked:via-green-500 peer-checked:to-green-600">
    </div>
    {/* Knob */}
    <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-500 ease-in-out peer-checked:translate-x-6 peer-checked:shadow-[0_0_15px_#00ffea]"></span>
  </label>
  <p className="text-sm text-gray-200">Make this Image Public</p>
</div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff22e9] to-[#a065ff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer shadow-lg hover:shadow-[0_0_20px_#ff22e9,0_0_30px_#a065ff] transition-all duration-300"
        >
          Generate Image
        </button>
      </motion.form>

      {/* Right Column - Generated Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col min-h-[400px] justify-center items-center z-10"
      >
        {/* Centered Image Icon */}
        <Image className="w-16 h-16 mb-4 text-[#a855f7]" />

        <h1 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent text-center">
          Generated Image
        </h1>

        <div className="flex-1 flex justify-center items-center">
          <p className="text-center text-gray-400">
            {generatedImage
              ? generatedImage
              : 'Enter a description and click "Generate Image" to get started.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default GenerateImages;
