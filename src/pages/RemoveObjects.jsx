import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Scissors, Image } from "lucide-react";

const RemoveObjects = () => {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [objectName, setObjectName] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setInputImage(imageUrl);
  };

  const handleRemoveObject = () => {
    if (!inputImage || !objectName) return;

    setLoading(true);

    setTimeout(() => {
      setOutputImage(inputImage);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative h-full overflow-y-scroll p-6 flex flex-wrap gap-8 justify-center bg-gradient-to-b from-black via-[#0a0014] to-black">

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />

      {/* LEFT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg"
      >
        <div className="flex items-center gap-3">
          <Scissors className="w-6 text-[#a855f7]" />
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Object Removal
          </h1>
        </div>

        {/* Upload */}
        <p className="mt-6 text-sm font-medium">Upload image</p>
        <button
          onClick={handleUploadClick}
          className="w-full mt-2 p-2 px-3 text-sm rounded-lg border border-gray-400 bg-black/30 text-gray-300 hover:bg-white/10 transition"
        >
          Choose File
        </button>

        {inputImage && (
          <img
            src={inputImage}
            alt="preview"
            className="mt-4 rounded-lg max-h-[200px]"
          />
        )}

        {/* Textarea */}
        <p className="mt-4 text-sm font-medium">
          Describe object name to remove
        </p>
        <textarea
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
          placeholder="e.g. watch or spoon, Only single object name"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-lg border border-gray-400 bg-black/30 placeholder-gray-400 text-white focus:ring-1 focus:ring-purple-400"
          rows={3}
        />

        {/* Button */}
        <button
          onClick={handleRemoveObject}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#ff22e9] to-[#a065ff] text-white px-4 py-2 mt-6 text-sm rounded-lg shadow-lg hover:shadow-[0_0_20px_#ff22e9,0_0_30px_#a065ff] transition-all duration-300"
        >
          {loading ? "Removing..." : "Remove Object"}
        </button>
      </motion.div>

      {/* RIGHT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative w-full max-w-lg p-6 bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-lg flex flex-col min-h-[400px] justify-center items-center"
      >
        <Image className="w-16 h-16 mb-4 text-[#a855f7]" />

        <h1 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent text-center">
          Processed Image
        </h1>

        {outputImage ? (
          <img
            src={outputImage}
            alt="output"
            className="rounded-xl max-h-[300px]"
          />
        ) : (
          <p className="text-center text-gray-400">
            Upload an image and click "Remove Object" to get started
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default RemoveObjects;