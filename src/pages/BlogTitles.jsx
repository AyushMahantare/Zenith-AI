import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';
import { useAuth } from "@clerk/clerk-react";

const BlogTitles = () => {
  const { getToken } = useAuth();

  const blogCategories = [
    'General','Technology','Business','Health','Lifestyle','Education','Travel','Food',
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🌟 API CALL (REAL)
  const generateTitles = async () => {
    if (!input) return;

    try {
      setLoading(true);
      setTitles([]);

      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/ai/blog-titles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (data.success) {
        setTitles(data.titles);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    generateTitles();
  };

  const trendingTopics = {
    General: ['AI in Daily Life','Climate Change','Remote Work Culture'],
    Technology: ['Web3 Innovations','AI & Automation','Quantum Computing'],
    Business: ['Startup Culture 2025','Remote Leadership','Sustainable Finance'],
    Health: ['Mindful Living','Nutrition Myths','Fitness Tech'],
    Lifestyle: ['Minimalism Trends','Digital Detox','Work-Life Balance'],
    Education: ['E-Learning Future','AI Tutors','Skill-based Hiring'],
    Travel: ['Eco-Tourism','Solo Backpacking','Space Tourism'],
    Food: ['Plant-based Diets','Fusion Cuisines','Food Delivery 3.0'],
  };

  const handleTrendingClick = (topic) => {
    setInput(topic);
    setTimeout(() => generateTitles(), 200);
  };

  return (
    <div className="relative h-full overflow-y-scroll p-6 flex flex-wrap gap-8 justify-center bg-gradient-to-b from-black via-[#0a0014] to-black">

      {/* LEFT FORM */}
      <motion.form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border rounded-2xl text-white"
      >
        <h1 className="text-2xl flex items-center gap-2">
          <Sparkles /> AI Title Generator
        </h1>

        <input
          className="w-full mt-4 p-2 rounded bg-black border"
          placeholder="Enter keyword..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* CATEGORY */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {blogCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`px-3 py-1 cursor-pointer border rounded ${
                selectedCategory === item ? "bg-purple-500" : "text-gray-400"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <button className="w-full mt-6 bg-purple-600 py-2 rounded">
          {loading ? "Generating..." : "Generate Titles"}
        </button>
      </motion.form>

      {/* RIGHT OUTPUT */}
      <div className="w-full max-w-lg p-6 bg-black/30 rounded-2xl text-white">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Hash /> Generated Titles
        </h2>

        {loading ? (
          <p className="animate-pulse text-gray-400">
            🤖 Generating titles...
          </p>
        ) : titles.length > 0 ? (
          <ul className="space-y-2">
            {titles.map((t, i) => (
              <li key={i} className="bg-white/10 p-2 rounded">
                {i + 1}. {t}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            Enter a keyword and click generate
          </p>
        )}
      </div>

      {/* TRENDING */}
      <div className="w-full max-w-lg p-6 bg-black/20 rounded-2xl text-white">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <TrendingUp /> Trending Topics
        </h2>

        {trendingTopics[selectedCategory].map((t, i) => (
          <p
            key={i}
            onClick={() => handleTrendingClick(t)}
            className="cursor-pointer hover:text-white text-gray-400"
          >
            • {t}
          </p>
        ))}
      </div>

      {/* TIPS */}
      <div className="w-full max-w-lg p-6 bg-black/20 rounded-2xl text-white">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Lightbulb /> Tips
        </h2>

        <ul className="text-gray-400 space-y-2">
          <li>Use numbers in titles</li>
          <li>Keep it short & catchy</li>
          <li>Use emotional triggers</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogTitles;