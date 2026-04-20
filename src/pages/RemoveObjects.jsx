import React, { useState, useRef } from "react";
import { Upload, Image } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const RemoveObjects = () => {
  const { getToken } = useAuth();

  const [inputImage, setInputImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removedAreas, setRemovedAreas] = useState([]);

  const fileRef = useRef(null);

  const handleUploadClick = () => {
    fileRef.current.click();
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setInputImage(url);
    setRemovedAreas([]); // reset
  };

  // 🎯 Click to "remove"
  const handleImageClick = async (e) => {
    if (!inputImage) return;

    const rect = e.target.getBoundingClientRect();

    const newArea = {
      x: e.clientX - rect.left - 40,
      y: e.clientY - rect.top - 40,
    };

    setRemovedAreas((prev) => [...prev, newArea]);

    try {
      setLoading(true);

      const token = await getToken();

      await fetch("http://localhost:3000/api/ai/remove-object", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-wrap gap-8 justify-center text-white">

      <input
        type="file"
        ref={fileRef}
        onChange={handleUpload}
        className="hidden"
      />

      {/* LEFT PANEL */}
      <div className="w-full max-w-md p-6 bg-black/30 rounded-xl">
        <h1 className="text-xl mb-4 flex gap-2">
          <Upload /> Remove Object
        </h1>

        <button
          onClick={handleUploadClick}
          className="w-full bg-purple-500 py-2 rounded mb-3"
        >
          Upload Image
        </button>

        <p className="text-sm text-gray-400">
          Click on image to remove objects
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full max-w-md p-6 bg-black/30 rounded-xl text-center">

        <h2 className="text-lg mb-4 flex justify-center gap-2">
          <Image /> Result
        </h2>

        {loading && (
          <p className="animate-pulse mb-2">
            🤖 Removing object...
          </p>
        )}

        {inputImage ? (
          <div className="relative inline-block">

            {/* ORIGINAL IMAGE */}
            <img
              src={inputImage}
              onClick={handleImageClick}
              className="rounded cursor-crosshair"
            />

            {/* 🔥 FAKE REMOVED AREAS */}
            {removedAreas.map((area, i) => (
              <div
                key={i}
                className="absolute rounded-full backdrop-blur-md bg-white/30 animate-pulse"
                style={{
                  top: area.y,
                  left: area.x,
                  width: 80,
                  height: 80,
                }}
              />
            ))}

          </div>
        ) : (
          <p className="text-gray-400">
            Upload image to remove object
          </p>
        )}
      </div>
    </div>
  );
};

export default RemoveObjects;