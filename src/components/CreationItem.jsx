import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-5 max-w-5xl text-sm 
        bg-black/60 backdrop-blur-xl 
        border border-cyan-500/30 rounded-2xl cursor-pointer
        shadow-[0_0_12px_rgba(0,255,255,0.15)] 
        hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]
        transition-all duration-300"
    >
      {/* Top Section */}
      <div className="flex justify-between items-center gap-4">
        {/* Left content */}
        <div>
          <h2 className="font-semibold text-white">{item.prompt}</h2>
          <p className="text-xs text-white/60">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Right side button */}
        <button
          className="px-4 py-1 rounded-full ml-auto
            bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 
            shadow-[0_0_10px_rgba(0,255,255,0.4)] 
            hover:shadow-[0_0_18px_rgba(0,255,255,0.7)] 
            transition-all duration-300"
        >
          {item.type}
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4">
          {item.type === "image" ? (
            <div className="flex justify-center">
              <img
                src={item.content}
                alt="creation"
                className="mt-3 w-full max-w-md rounded-xl 
                  border border-cyan-400/30 
                  shadow-[0_0_25px_rgba(0,255,255,0.4)]"
              />
            </div>
          ) : (
            <div
              className="mt-3 max-h-96 overflow-y-auto text-sm 
                text-white/80 leading-relaxed
                bg-black/60 backdrop-blur-lg p-4 rounded-xl 
                border border-cyan-500/20 
                shadow-[0_0_15px_rgba(0,255,255,0.3)]
                prose prose-invert"
            >
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
