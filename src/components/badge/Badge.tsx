import React, { useState } from 'react';

interface BadgeProps {
  label: string;
  handlerClick: () => {};
}

const Badge = ({ label, handlerClick }: BadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <p
      className={`relative inline-block bg-slate-400 py-[2px] px-[10px] text-black text-lg text-center cursor-pointer rounded-xl ${
        isHovered ? 'bg-slate-500 pr-7' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
      <svg
        onClick={handlerClick}
        className={`w-5 h-5 text-gray-700 absolute right-1 top-[5px]  ${
          isHovered ? 'block' : 'hidden'
        }`}
      >
        <use xlinkHref="./sprite.svg#close" />
      </svg>
    </p>
  );
};

export default Badge;
