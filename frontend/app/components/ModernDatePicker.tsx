'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  isToday,
  parseISO,
  isValid
} from 'date-fns';
import { vi } from 'date-fns/locale';

interface ModernDatePickerProps {
  value: string; // ISO format yyyy-MM-dd
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ModernDatePicker({ value, onChange, placeholder = "Chọn ngày...", className = "" }: ModernDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse the current value safely
  const selectedDate = value ? (isValid(parseISO(value)) ? parseISO(value) : null) : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateSelect = (day: Date) => {
    onChange(format(day, 'yyyy-MM-dd'));
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 h-10 px-4 bg-gray-50/50 border border-gray-100 rounded-xl cursor-pointer hover:border-blue-200 transition-all group"
      >
        <CalendarIcon className="w-4.5 h-4.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <span className={`text-[13px] flex-1 ${selectedDate ? 'text-gray-700 font-bold' : 'text-gray-400 font-medium'}`}>
          {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : placeholder}
        </span>
        {selectedDate && (
          <X 
            onClick={handleClear}
            className="w-3.5 h-3.5 text-gray-300 hover:text-red-400 cursor-pointer" 
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 bg-white border border-gray-100 rounded-[20px] shadow-2xl p-5 w-[300px] left-0 animate-in fade-in zoom-in duration-200 origin-top">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={(e) => { e.stopPropagation(); prevMonth(); }}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4.5 h-4.5 text-gray-400" />
            </button>
            <h4 className="text-[14px] font-bold text-[#101828] capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: vi })}
            </h4>
            <button 
              onClick={(e) => { e.stopPropagation(); nextMonth(); }}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <ChevronRight className="w-4.5 h-4.5 text-gray-400" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['H', 'B', 'T', 'N', 'S', 'B', 'C'].map((day, i) => (
              <div key={i} className="h-8 flex items-center justify-center text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day, i) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrMonth = isSameMonth(day, currentMonth);
              const isTod = isToday(day);

              return (
                <button
                  key={i}
                  disabled={!isCurrMonth}
                  onClick={(e) => { e.stopPropagation(); handleDateSelect(day); }}
                  className={`
                    h-9 w-9 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center relative
                    ${!isCurrMonth ? 'text-gray-100 cursor-default' : 'hover:bg-blue-50 hover:text-blue-600'}
                    ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-600 hover:text-white' : ''}
                    ${isTod && !isSelected ? 'text-blue-500 bg-blue-50/50' : ''}
                  `}
                >
                  {format(day, 'd')}
                  {isTod && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
            <button 
              onClick={(e) => { e.stopPropagation(); handleDateSelect(new Date()); }}
              className="text-[12px] font-bold text-blue-500 hover:text-blue-700 transition-all px-3 py-1 hover:bg-blue-50 rounded-lg"
            >
              Hôm nay
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="text-[12px] font-bold text-gray-400 hover:text-gray-600 transition-all px-3 py-1 hover:bg-gray-50 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
