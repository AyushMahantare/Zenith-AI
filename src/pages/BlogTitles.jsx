import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';

const BlogTitles = () => {
  const blogCategories = [
    'General',
    'Technology',
    'Business',
    'Health',
    'Lifestyle',
    'Education',
    'Travel',
    'Food',
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState('');

  // Dummy trending topics
  const trendingTopics = {
    General: ['AI in Daily Life', 'Climate Change', 'Remote Work Culture'],
    Technology: ['Web3 Innovations', 'AI & Automation', 'Quantum Computing'],
    Business: ['Startup Culture 2025', 'Remote Leadership', 'Sustainable Finance'],
    Health: ['Mindful Living', 'Nutrition Myths', 'Fitness Tech'],
    Lifestyle: ['Minimalism Trends', 'Digital Detox', 'Work-Life Balance'],
    Education: ['E-Learning Future', 'AI Tutors', 'Skill-based Hiring'],
    Travel: ['Eco-Tourism', 'Solo Backpacking', 'Space Tourism'],
    Food: ['Plant-based Diets', 'Fusion Cuisines', 'Food Delivery 3.0'],
  };

  // Dummy tips
  const headlineTips = [
    'Use numbers to attract attention (e.g., "7 Secrets...").',
    'Ask engaging questions in your titles.',
    'Keep it short, clear, and powerful.',
    'Use emotional triggers: surprising, shocking, inspiring.',
    'Focus on reader benefits, not just the topic.',
  ];

  // Generate dummy particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

  // Function to generate titles
  const generateTitles = (keyword) => {
    if (!keyword) return;
    setGeneratedArticle(
      `✨ Suggested Blog Titles for "${keyword}" in ${selectedCategory} category:\n\n` +
        `1. Exploring ${keyword}: A New Perspective\n` +
        `2. The Future of ${keyword} in ${selectedCategory}\n` +
        `3. How ${keyword} is Changing the World of ${selectedCategory}\n` +
        `4. Top Insights About ${keyword} You Should Know\n` +
        `5. Why ${keyword} Matters More Than Ever`
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    generateTitles(input);
  };

  // Handle trending topic click
  const handleTrendingClick = (topic) => {
    setInput(topic);
    generateTitles(topic);
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

      {/* Left Column - Form */}
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
            AI Title Generator
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-lg border border-gray-400 bg-black/30 placeholder-gray-400 text-white focus:ring-1 focus:ring-purple-400"
          placeholder="The Future of Artificial Intelligence..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 font-medium flex-wrap">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition-all duration-300 ${
                selectedCategory === item
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-[0_0_10px_#a855f7]'
                  : 'text-gray-400 border-gray-500 hover:bg-white/10 hover:text-white'
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff22e9] to-[#a065ff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer shadow-lg hover:shadow-[0_0_20px_#ff22e9,0_0_30px_#a065ff] transition-all duration-300"
        >
          <Hash className="w-5" />
          Generate Title
        </button>
      </motion.form>

      {/* Right Column - Generated Titles */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col min-h-[400px] justify-between z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Hash className="w-5 h-5 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Generated Titles
          </h1>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400 whitespace-pre-line">
            <Hash className="w-9 h-9" />
            <p className="text-center">
              {generatedArticle
                ? generatedArticle
                : 'Enter a keyword and click "Generate Title" to get started'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 📊 Trending Topics Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Trending Topics in {selectedCategory}
          </h1>
        </div>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          {trendingTopics[selectedCategory].map((topic, idx) => (
            <li
              key={idx}
              onClick={() => handleTrendingClick(topic)}
              className="cursor-pointer hover:text-white hover:underline transition-all duration-200"
            >
              {topic}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* 📝 How To Generate Killer Headlines */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-5 h-5 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            How To Generate Killer Headlines
          </h1>
        </div>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          {headlineTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default BlogTitles;
