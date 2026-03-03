'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'right' | 'top' | 'bottom' | 'left';
  visible?: boolean;
}

export default function Tooltip({ children, content, position = 'right', visible = true }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      if (position === 'right') {
        top = rect.top + rect.height / 2;
        left = rect.right + 10;
      } else if (position === 'left') {
        top = rect.top + rect.height / 2;
        left = rect.left - 10;
      } else if (position === 'top') {
        top = rect.top - 10;
        left = rect.left + rect.width / 2;
      } else if (position === 'bottom') {
        top = rect.bottom + 10;
        left = rect.left + rect.width / 2;
      }

      setCoords({ top, left });
    }
    setIsHovered(true);
  };

  if (!visible) return <>{children}</>;

  return (
    <div 
      ref={triggerRef}
      className="inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && mounted && createPortal(
        <div 
          className="fixed z-[9999] px-2.5 py-1.5 text-[12px] font-bold text-[#333] bg-white border border-gray-100 rounded-lg shadow-[0_10px_20px_-5px_rgba(0,0,0,0.15)] whitespace-nowrap pointer-events-none animate-in fade-in zoom-in duration-150"
          style={{ 
            top: `${coords.top}px`, 
            left: `${coords.left}px`,
            transform: position === 'right' || position === 'left' ? 'translateY(-50%)' : 'translateX(-50%)'
          }}
        >
          {content}
          {/* Arrow */}
          <div 
            className={`absolute w-2 h-2 bg-white border-l border-b border-gray-100 rotate-45 ${
              position === 'right' ? '-left-[5px] top-1/2 -translate-y-1/2' :
              position === 'left' ? '-right-[5px] top-1/2 -translate-y-1/2 rotate-[225deg]' :
              position === 'top' ? '-bottom-[5px] left-1/2 -translate-x-1/2 rotate-[-45deg]' :
              '-top-[5px] left-1/2 -translate-x-1/2 rotate-[135deg]'
            }`} 
          />
        </div>,
        document.body
      )}
    </div>
  );
}
