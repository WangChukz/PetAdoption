'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  color?: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  className = '',
  placeholder = 'Select...',
  disabled = false
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-[10px] text-[13px] outline-none transition-all ${
          isOpen ? 'border-orange-200 ring-4 ring-orange-50' : 'hover:border-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className={`${!selectedOption ? 'text-gray-400' : 'text-[#101828]'} truncate`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-100 rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div 
            className="max-h-[240px] overflow-y-auto py-1 scrollbar-none"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .scrollbar-none::-webkit-scrollbar { display: none; }
            `}} />
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-[13px] transition-colors hover:bg-orange-50 flex items-center gap-2 ${
                  option.id === value ? 'bg-orange-50 font-bold text-orange-600' : 'text-gray-700'
                }`}
              >
                {option.color && <div className={`w-2 h-2 rounded-full ${option.color}`} />}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
