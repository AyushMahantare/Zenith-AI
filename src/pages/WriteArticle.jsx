import { Edit, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";

const WriteArticle = () => {
  const { getToken } = useAuth();

  const articleLength = [
    { length: 800, text: "Short(500-800 words)" },
    { length: 1200, text: "Medium(800-1200 words)" },
    { length: 1600, text: "Long(1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [generatedArticle, setGeneratedArticle] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const wordCount = displayedText
  ? displayedText.trim().split(/\s+/).length
  : 0;

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 40; i++) {
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
  useEffect(() => {
  if (!generatedArticle) return;

  let index = 0;
  setDisplayedText("");

  const interval = setInterval(() => {
    setDisplayedText((prev) => prev + generatedArticle.charAt(index));
    index++;

    if (index >= generatedArticle.length) {
      clearInterval(interval);
    }
  }, 10); // typing speed

  return () => clearInterval(interval);
}, [generatedArticle]);

  // ✅ CONNECTED TO BACKEND
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input) return;

    try {
      setLoading(true);
      setGeneratedArticle("");

      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/ai/generate-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: input,
          length: selectedLength.length,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedArticle(data.content);
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("ERROR:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full overflow-y-scroll p-6 flex flex-wrap gap-8 justify-center bg-gradient-to-b from-black via-[#0a0014] to-black">

      {/* Background particles */}
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

      {/* FORM */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-6 rounded-3xl text-white bg-black/30 backdrop-blur-xl z-10"
      >
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles /> Article Configuration
        </h1>

        <input
          type="text"
          placeholder="Enter topic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full mt-4 p-2 rounded bg-black border"
        />

        {/* LENGTH */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {articleLength.map((item, i) => (
            <span
              key={i}
              onClick={() => setSelectedLength(item)}
              className={`px-3 py-1 cursor-pointer border rounded ${
                selectedLength.text === item.text
                  ? "bg-purple-500"
                  : "text-gray-400"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button className="mt-6 w-full bg-purple-600 py-2 rounded">
          {loading ? "Generating..." : "Generate Article"}
        </button>
      </form>

      {/* OUTPUT */}
      <div className="w-full max-w-lg p-6 bg-black/30 rounded-3xl text-white z-10">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Edit /> Generated Article
        </h2>

        {loading ? (
  <p className="text-gray-400 animate-pulse">
    🤖 AI is generating content...
  </p>
) : displayedText ? (
  <>
    <p className="text-xs text-gray-400 mb-2">
      Word Count: {wordCount}
    </p>

    <pre className="whitespace-pre-wrap leading-relaxed">
      {displayedText}
      <span className="animate-pulse">|</span>
    </pre>
  </>
) : (
  <p className="text-gray-400 text-center">
    Enter a topic and click "Generate Article" to get started
  </p>
)}
      </div>
    </div>
  );
};

export default WriteArticle;