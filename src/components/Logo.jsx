import React from 'react';

export default function Logo({ light = false }) {
  // Toggle between black and white text based on the 'light' prop
  const textColor = light ? 'text-white' : 'text-black';

  return (
    <div className={`flex flex-col leading-[0.8] select-none ${textColor} text-left`}>
      {/* Top Row: UP + Teal Arrow */}
      <div className="flex items-center">
        <span className="text-[28px] font-[1000] tracking-tighter">UP</span>
        <div className="ml-1 mb-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#00ced1]" // The teal color from your image
          >
            <path
              d="M4 20L20 4M20 4H10M20 4V14"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Middle Row: LIFE */}
      <span className="text-[28px] font-[1000] tracking-tighter">LIFE</span>

      {/* Bottom Row: INDIA PVT LTD */}
      <span className="text-[8.5px] font-bold tracking-[0.18em] mt-1.5 whitespace-nowrap">
        INDIA PVT LTD
      </span>
    </div>
  );
}