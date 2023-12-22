import React, { useState } from 'react';

interface BadgeProps {
  label: string;
  handlerClick?: () => void;
  forViewing?: boolean;
}

const Badge = ({ label, handlerClick, forViewing }: BadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <p
        onClick={handlerClick}
        className={`relative inline-block bg-indigo-500 py-[2px] px-[10px] text-white text-lg text-center cursor-pointer rounded-xl ${
          isHovered && !forViewing ? 'bg-indigo-600 pr-7' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
        {forViewing || (
          <svg
            onClick={() => {}}
            className={`w-5 h-5 text-white absolute right-1 top-[7px]  ${
              isHovered ? 'block' : 'hidden'
            }`}
          >
            <use xlinkHref="./sprite.svg#close" />
          </svg>
        )}
      </p>
    </div>
  );
};

export default Badge;
