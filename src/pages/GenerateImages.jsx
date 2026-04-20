import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Image } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const GenerateImages = () => {
  const { getToken } = useAuth();

  const downloadImage = async (url, index) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `ai-image-${index + 1}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const imageStyle = [
    "Realistic",
    "Anime",
    "Cartoon",
    "Fantasy",
    "3D",
    "Portrait",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [images, setImages] = useState([]); // 🔥 multiple images
  const [loading, setLoading] = useState(false);
  const [publish, setPublish] = useState(false);

  // 🚀 GENERATE MULTIPLE IMAGES
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;

    try {
      setLoading(true);
      setImages([]);

      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/ai/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: input + " " + selectedStyle,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setImages(data.images); // 🔥 use backend images
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full overflow-y-scroll p-6 flex flex-wrap gap-8 justify-center bg-gradient-to-b from-black via-[#0a0014] to-black">
      {/* FORM */}
      <motion.form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border rounded-2xl text-white"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="text-purple-400" />
          <h1 className="text-2xl font-semibold">AI Image Generator</h1>
        </div>

        <textarea
          className="w-full mt-4 p-2 rounded bg-black border"
          placeholder="Describe your image..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* STYLE */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {imageStyle.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedStyle(item)}
              className={`px-3 py-1 border rounded cursor-pointer ${
                selectedStyle === item ? "bg-purple-500" : "text-gray-400"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* TOGGLE */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
          <p className="text-sm">Make Public</p>
        </div>

        <button className="w-full mt-6 bg-purple-600 py-2 rounded">
          {loading ? "Generating..." : "Generate Images"}
        </button>
      </motion.form>

      {/* OUTPUT */}
      <div className="w-full max-w-lg p-6 bg-black/20 rounded-2xl text-white text-center">
        <h2 className="text-xl mb-4 flex items-center justify-center gap-2">
          <Image /> Generated Images
        </h2>

        {loading ? (
          <p className="animate-pulse text-purple-400">
            🎨 AI is generating images...
          </p>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img}
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/800/500";
                  }}
                  className="rounded-lg hover:scale-105 transition"
                />

                {/* 🔽 Download Button */}
                <button
                  onClick={() => downloadImage(img, i)}
                  className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ⬇ Download
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Enter a prompt and generate images</p>
        )}

        {/* 🔄 REGENERATE */}
        {images.length > 0 && (
          <button
            onClick={onSubmitHandler}
            className="mt-4 bg-purple-500 px-4 py-1 rounded"
          >
            🔄 Regenerate
          </button>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
