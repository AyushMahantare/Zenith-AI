import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, FileCheck } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const ReviewResume = () => {
  const { getToken } = useAuth();

  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 📄 Upload (fake extraction for demo)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    // ⚠️ Fake resume text (for demo)
    setText(`
      JavaScript React API project teamwork problem solving
    `);
  };

  // 🚀 API CALL
  const handleReview = async () => {
    if (!text) return;

    try {
      setLoading(true);
      setResult(null);

      const token = await getToken();

      const res = await fetch(
        "http://localhost:3000/api/ai/review-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setResult(data.result);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✨ particles (UNCHANGED)
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
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
            transition={{
              delay: p.delay,
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
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

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf"
      />

      {/* LEFT CARD (UNCHANGED UI) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg z-10"
      >
        <div className="flex items-center gap-3">
          <FileText className="w-6 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Resume Review
          </h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Resume</p>

        <button
          onClick={handleUploadClick}
          className="w-full mt-2 p-2 px-3 text-sm rounded-lg border border-gray-400 bg-black/30 text-gray-300 hover:bg-white/10 transition"
        >
          {fileName ? fileName : "Choose File No file chosen"}
        </button>

        <p className="text-xs text-gray-400 mt-1">
          Supports PDF resume only
        </p>

        <button
          onClick={handleReview}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff22e9] to-[#a065ff] text-white px-4 py-2 mt-6 text-sm rounded-lg shadow-lg hover:shadow-[0_0_20px_#ff22e9,0_0_30px_#a065ff] transition-all duration-300"
        >
          {loading ? "Reviewing..." : "Review Resume"}
        </button>
      </motion.div>

      {/* RIGHT CARD (UPDATED CONTENT ONLY) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col min-h-[400px] justify-center items-center z-10"
      >
        <FileCheck className="w-16 h-16 mb-4 text-[#a855f7]" />

        <h1 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent text-center">
          Analysis Results
        </h1>

        {loading ? (
          <p className="animate-pulse text-purple-400">
            🤖 Analyzing resume...
          </p>
        ) : result ? (
          <div className="text-sm text-left space-y-4 w-full">

            <p className="text-lg">
              ATS Score:{" "}
              <span className="text-green-400">{result.score}%</span>
            </p>

            <div>
              <h3 className="text-green-400">Matched Keywords</h3>
              {result.matched.map((k, i) => (
                <span key={i} className="mr-2 text-xs bg-green-500/20 px-2 py-1 rounded">
                  {k}
                </span>
              ))}
            </div>

            <div>
              <h3 className="text-red-400">Missing Keywords</h3>
              {result.missing.map((k, i) => (
                <span key={i} className="mr-2 text-xs bg-red-500/20 px-2 py-1 rounded">
                  {k}
                </span>
              ))}
            </div>

            <div>
              <h3 className="text-yellow-400">Issues Found</h3>
              {result.mistakes.map((m, i) => (
                <p key={i}>⚠ {m}</p>
              ))}
            </div>

          </div>
        ) : (
          <p className="text-gray-400 text-center">
            Upload a resume and click "Review Resume" to get started
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ReviewResume;