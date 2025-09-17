import { Edit, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short(500-800 words)' },
    { length: 1200, text: 'Medium(800-1200 words)' },
    { length: 1600, text: 'Long(1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 40;
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      });
    }
    setParticles(temp);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // For now, we just use the input as the "generated article"
    setGeneratedArticle(input || 'This is a sample generated article.');
    setInput(''); // optional: clear input after generating
  };

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
              ease: "easeInOut",
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

      {/* Left Column - Form */}
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg z-10"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Article Configuration
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-lg border border-gray-400 bg-black/30 placeholder-gray-400 text-white focus:ring-1 focus:ring-purple-400"
          placeholder="The Future of Artificial Intelligence is..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex gap-3 font-medium">
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-300 ${
                selectedLength.text === item.text
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-[0_0_10px_#a855f7]'
                  : 'text-gray-400 border-gray-500 hover:bg-white/10 hover:text-white'
              }`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff22e9] to-[#a065ff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer shadow-lg hover:shadow-[0_0_20px_#ff22e9,0_0_30px_#a065ff] transition-all duration-300"
        >
          <Edit className="w-5 h-5" />
          Generate Article
        </button>
      </motion.form>

      {/* Right Column - Generated Article */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col min-h-[400px] justify-between z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Edit className="w-5 h-5 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Generated Article
          </h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Edit className="w-9 h-9" />
            <p className="text-center">
              {generatedArticle
                ? generatedArticle
                : 'Enter a topic and click "Generate Article" to get started'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Article Writer Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="w-full max-w-4xl p-8 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col gap-6 z-10"
      >
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
          How Can an AI Article Writer Help You?
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 text-gray-300">
          <div className="p-4 bg-black/30 rounded-xl border border-white/10 hover:shadow-[0_0_15px_#a855f7] transition-all duration-300">
            <h3 className="font-semibold text-lg mb-2 text-white">Save Time</h3>
            <p>Generate high-quality content in minutes, allowing you to focus on strategy and research instead of writing from scratch.</p>
          </div>
          <div className="p-4 bg-black/30 rounded-xl border border-white/10 hover:shadow-[0_0_15px_#a855f7] transition-all duration-300">
            <h3 className="font-semibold text-lg mb-2 text-white">Boost Creativity</h3>
            <p>Get fresh ideas and perspectives on your topic, helping you overcome writer’s block and maintain originality.</p>
          </div>
          <div className="p-4 bg-black/30 rounded-xl border border-white/10 hover:shadow-[0_0_15px_#a855f7] transition-all duration-300">
            <h3 className="font-semibold text-lg mb-2 text-white">SEO Optimization</h3>
            <p>Create content structured for search engines to improve visibility and attract more readers organically.</p>
          </div>
          <div className="p-4 bg-black/30 rounded-xl border border-white/10 hover:shadow-[0_0_15px_#a855f7] transition-all duration-300">
            <h3 className="font-semibold text-lg mb-2 text-white">Consistency</h3>
            <p>Maintain a steady flow of articles without compromising on quality, ensuring your audience stays engaged.</p>
          </div>
        </div>
      </motion.div>

      {/* Sample Article Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="w-full max-w-4xl p-8 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col gap-4 z-10"
      >
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
          Sample Article Generated
        </h2>
        <div className="max-h-96 overflow-y-auto text-gray-300 space-y-4">
          {generatedArticle ? (
            <p>{generatedArticle}</p>
          ) : (
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed a eros ut nunc faucibus vulputate.
              </p>
              <p>
                Quisque ut tortor sed massa sollicitudin fringilla. Vivamus
                consequat quam nec lacus sollicitudin, vitae tincidunt magna
                imperdiet.
              </p>
              <p>
                Aliquam erat volutpat. Sed nec mauris et neque facilisis
                scelerisque. Suspendisse potenti.
              </p>
            </>
          )}
        </div>
      </motion.div>

    </div>
  );
};

export default WriteArticle;
