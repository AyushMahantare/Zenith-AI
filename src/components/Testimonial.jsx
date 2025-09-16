import React from 'react';

const Testimonial = () => {
  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 w-full
      bg-gradient-to-br from-black via-[#0a0014] to-black relative">

      {/* Section Title */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text 
                     bg-gradient-to-r from-purple-800 via-pink-200 to-purple-800 heading-glow"
        >
          What Our Users Say
        </h2>
        <p
          className="text-gray-400 mt-2 max-w-lg mx-auto para-glow"
        >
          Feedback from our amazing community
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[
          {
            img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600',
            text: '“Radiant made undercutting all of our competitors an absolute breeze.”',
            name: 'John Doe',
            role: 'Content Marketing',
            rating: 5,
          },
          {
            img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600',
            text: '“AI tools improved our workflow tremendously.”',
            name: 'Jane Smith',
            role: 'Marketing Lead',
            rating: 4,
          },
          {
            img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop',
            text: '“The best AI experience I have ever used!”',
            name: 'Michael Lee',
            role: 'Product Manager',
            rating: 5,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 max-w-xs rounded-2xl 
              bg-black/40 backdrop-blur-xl border border-white/10 
              shadow-lg transition-all duration-500 cursor-pointer
              hover:-translate-y-2 hover:shadow-[0_0_20px_#a855f7,0_0_30px_#ec4899]"
          >
            <div className="relative mb-6">
              <img
                src={item.img}
                alt={item.name}
                className="h-64 w-full object-cover object-top rounded-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl"></div>
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-200 font-medium border-b border-gray-700 pb-4">
              {item.text}
            </p>

            {/* User Info */}
            <p className="mt-4 font-semibold text-white">{item.name}</p>
            <p className="text-sm font-medium text-purple-400">{item.role}</p>

            {/* Rating Stars */}
            <div className="flex mt-2 space-x-1 star-wrapper">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 star ${
                    i < item.rating ? 'text-purple-600' : 'text-gray-700'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.954a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.442a1 1 0 00-.364 1.118l1.287 3.954c.3.921-.755 1.688-1.54 1.118l-3.36-2.442a1 1 0 00-1.176 0l-3.36 2.442c-.784.57-1.838-.197-1.539-1.118l1.287-3.954a1 1 0 00-.364-1.118L2.036 9.38c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.954z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Glowing heading and stars style */}
      <style>
        {`
          @keyframes headingGlow {
            0%, 100% {
              text-shadow: 0 0 8px rgba(255, 0, 255, 0.7),
                           0 0 16px rgba(255, 105, 180, 0.5),
                           0 0 24px rgba(200, 0, 255, 0.4);
            }
            50% {
              text-shadow: 0 0 16px rgba(255, 0, 255, 0.8),
                           0 0 24px rgba(255, 105, 180, 0.6),
                           0 0 32px rgba(200, 0, 255, 0.5);
            }
          }
          .heading-glow {
            animation: headingGlow 3s infinite ease-in-out;
          }

          .para-glow {
            animation: headingGlow 4s infinite alternate;
          }

          /* Star glow on hover of card */
          .star-wrapper:hover .star {
            animation: starGlow 1.5s infinite alternate;
          }
          @keyframes starGlow {
            0% { filter: drop-shadow(0 0 2px #a855f7); }
            50% { filter: drop-shadow(0 0 4px #a855f7); }
            100% { filter: drop-shadow(0 0 2px #a855f7); }
          }
        `}
      </style>
    </div>
  );
};

export default Testimonial;
