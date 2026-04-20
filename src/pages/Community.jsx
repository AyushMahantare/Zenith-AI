import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const Community = () => {
  const { getToken, userId } = useAuth();

  const [selectedPost, setSelectedPost] = useState(null);
  const [creations, setCreations] = useState([]);

  // particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

  // 🚀 FETCH DATA
  const fetchCreations = async () => {
    try {
      const token = await getToken();

      const res = await fetch("http://localhost:3000/api/ai/community", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setCreations(data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCreations();
  }, []);

  // ❤️ LIKE
  const handleLike = async (id) => {
    try {
      const token = await getToken();

      const res = await fetch(
        `http://localhost:3000/api/ai/like/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setCreations((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, likes: data.likes } : item
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative h-full overflow-y-scroll p-6 bg-gradient-to-b from-black via-[#0a0014] to-black">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
            transition={{ delay: p.delay, duration: 6, repeat: Infinity }}
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

      {/* Title */}
      <h1 className="text-2xl font-semibold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
        Community Creations
      </h1>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {creations.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-lg hover:border-purple-500/40 transition-all duration-300"
          >

            {/* CLICKABLE CONTENT */}
            <div
              className="relative overflow-hidden cursor-pointer"
              onClick={() => setSelectedPost(item)}
            >

              {/* IMAGE */}
              {item.type === "image" && (
                <img
                  src={item.content}
                  className="w-full h-[250px] object-cover group-hover:scale-105 transition"
                />
              )}

              {/* ARTICLE PREVIEW */}
              {item.type === "article" && (
                <div className="w-full h-[250px] p-4 bg-black/40 text-gray-300 text-sm overflow-hidden">
                  {item.content.slice(0, 120)}...
                </div>
              )}

              {/* RESUME SCORE */}
              {item.type === "resume_review" && (
                <div className="w-full h-[250px] flex flex-col items-center justify-center bg-black/40">
                  {(() => {
                    const data = JSON.parse(item.content || "{}");
                    return (
                      <>
                        <p className="text-2xl text-green-400">
                          {data.score || 0}%
                        </p>
                        <p className="text-gray-400 text-sm">
                          Resume Score
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* FALLBACK */}
              {!["image", "article", "resume_review"].includes(item.type) && (
                <div className="w-full h-[250px] flex items-center justify-center bg-black/40 text-gray-400">
                  Content
                </div>
              )}

            </div>

            {/* CARD BODY */}
            <div className="p-4 flex flex-col gap-2">
              <p className="text-gray-300 text-sm line-clamp-2">
                {item.prompt}
              </p>

              <div className="flex items-center justify-between mt-1">
                <p className="text-gray-400 text-sm">
                  {item.likes?.length || 0}{" "}
                  {(item.likes?.length || 0) === 1 ? "like" : "likes"}
                </p>

                <motion.div whileTap={{ scale: 1.3 }}>
                  <Heart
                    onClick={() => handleLike(item.id)}
                    className={`w-5 h-5 cursor-pointer ${
                      item.likes?.includes(userId)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </motion.div>
              </div>
            </div>

          </motion.div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-[#0a0014] p-6 rounded-xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-lg mb-3">
              {selectedPost.prompt}
            </h2>

            {/* IMAGE */}
            {selectedPost.type === "image" && (
              <img src={selectedPost.content} className="rounded" />
            )}

            {/* ARTICLE */}
            {selectedPost.type === "article" && (
              <p className="text-gray-300 whitespace-pre-line">
                {selectedPost.content}
              </p>
            )}

            {/* RESUME */}
            {selectedPost.type === "resume_review" && (() => {
              const data = JSON.parse(selectedPost.content || "{}");
              return (
                <div className="text-sm text-gray-300">
                  <p className="text-green-400">
                    Score: {data.score}%
                  </p>

                  <p className="mt-2 text-green-400">Matched:</p>
                  {data.matched?.map((m, i) => (
                    <p key={i}>• {m}</p>
                  ))}

                  <p className="mt-2 text-red-400">Missing:</p>
                  {data.missing?.map((m, i) => (
                    <p key={i}>• {m}</p>
                  ))}
                </div>
              );
            })()}

            <button
              onClick={() => setSelectedPost(null)}
              className="mt-4 bg-purple-500 px-4 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Community;