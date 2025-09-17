import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setIsScrolled(currentScroll > 10);

      if (currentScroll > lastScrollY && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between 
      py-5 px-3 sm:px-12 xl:px-20 transition-all duration-500
      ${isScrolled ? 'bg-black/40 backdrop-blur-md shadow-md' : 'bg-transparent'}
      ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 sm:w-36 cursor-pointer transition-all duration-300
                   "
        onClick={() => navigate('/')}
      />

      {/* User Button or Get Started */}
      {user ? <UserButton /> : <GetStartedButton openSignIn={openSignIn} />}

      {/* Inline CSS for glowing button */}
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 5px #a78bfa, 0 0 10px #a78bfa, 0 0 15px #a78bfa;
            }
            50% {
              box-shadow: 0 0 10px #c4b5fd, 0 0 15px #c4b5fd, 0 0 20px #c4b5fd;
            }
          }
          .animate-glow {
            animation: glow 2s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

// Get Started button (slightly smaller for compact navbar)
const GetStartedButton = ({ openSignIn }) => (
  <button
    onClick={openSignIn}
    className="flex items-center gap-2 rounded-full text-xs sm:text-sm text-purple-100 px-6 sm:px-8 py-1.5 sm:py-2 border border-purple-400 cursor-pointer animate-glow bg-transparent transition-all duration-300 hover:scale-105"
  >
    Get Started
    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
  </button>
);

export default Navbar;
