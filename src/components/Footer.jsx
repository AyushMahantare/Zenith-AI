import React from "react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-black/90 relative">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        {/* Logo & Description */}
        <div className="md:max-w-96">
          <svg
            width="157"
            height="40"
            viewBox="0 0 157 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Your SVG paths */}
          </svg>
          <p className="mt-6 text-sm text-gray-400">
            ZenithAI is your premier AI-powered platform, providing cutting-edge
            tools for content creation, image generation, and business automation.
            We empower individuals and enterprises to innovate, streamline workflows,
            and bring ideas to life with advanced artificial intelligence.
          </p>
        </div>

        {/* Links and Newsletter */}
        <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-12 md:gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-5 text-purple-300">Zenith-AI</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#hero" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/aitools" className="footer-link">
                  AI Tools
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  About us
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="max-w-sm">
            <h2 className="font-semibold text-purple-200 mb-5">
              Subscribe to our newsletter
            </h2>
            <p className="text-sm text-gray-400">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <div className="flex items-center gap-2 pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-xs h-10 px-3 rounded-md bg-black/40 text-white placeholder-gray-400 border border-gray-500/30 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all glow-input"
              />
              <button className="subscribe-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-400">
        Copyright 2025 © <a href="https://zenithai.com" className="footer-link">ZenithAI</a>. All Rights Reserved.
      </p>

      {/* Footer Glow Styles */}
      <style>
        {`
          /* Glow animation for links */
          .footer-link {
            color: #9b59b6;
            transition: all 0.3s ease;
            position: relative;
          }
          .footer-link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -2px;
            left: 0;
            background: linear-gradient(90deg, #a855f7, #ec4899);
            opacity: 0;
            transform: scaleX(0);
            transition: all 0.3s ease;
          }
          .footer-link:hover {
            color: #ec4899;
          }
          .footer-link:hover::after {
            opacity: 1;
            transform: scaleX(1);
          }

          /* Subscribe button glow */
          .subscribe-btn {
            background: #6b21a8;
            color: white;
            width: 6rem;
            height: 2.25rem;
            border-radius: 0.5rem;
            position: relative;
            transition: all 0.3s ease;
          }
          .subscribe-btn::before {
            content: '';
            position: absolute;
            top: -4px; left: -4px; right: -4px; bottom: -4px;
            background: linear-gradient(45deg, #a855f7, #ec4899);
            border-radius: 0.5rem;
            filter: blur(8px);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }
          .subscribe-btn:hover::before {
            opacity: 1;
          }
          .subscribe-btn:hover {
            background: #7e22ce;
          }

          /* Glowing border effect on email input */
          .glow-input:focus {
            box-shadow: 0 0 8px #a855f7, 0 0 16px #ec4899;
            border-color: #ec4899;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
