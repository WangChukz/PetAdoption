'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  X,
  ChevronDown
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
  isWithinInterval,
  isAfter,
  isBefore,
  isValid,
  parseISO
} from 'date-fns';
import { vi } from 'date-fns/locale';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  className?: string;
}

export default function CustomDateRangePicker({
  startDate,
  endDate,
  onChange,
  className = ''
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const start = startDate ? parseISO(startDate) : null;
  const end = endDate ? parseISO(endDate) : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateClick = (day: Date) => {
    if (!start || (start && end)) {
      onChange(format(day, 'yyyy-MM-dd'), '');
    } else if (start && !end) {
      if (isBefore(day, start)) {
        onChange(format(day, 'yyyy-MM-dd'), format(start, 'yyyy-MM-dd'));
      } else {
        onChange(format(start, 'yyyy-MM-dd'), format(day, 'yyyy-MM-dd'));
        setIsOpen(false); // Close after range selected
      }
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>
        <span className="text-[14px] font-bold text-gray-700">
          Tháng {format(currentMonth, 'MM yyyy', { locale: vi })}
        </span>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['H', 'B', 'T', 'N', 'S', 'B', 'C'];
    return (
      <div className="grid grid-cols-7 mb-1">
        {days.map((day, i) => (
          <div key={i} className="text-center text-[11px] font-black text-gray-400 py-2 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDateWeek = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDateWeek = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDateWeek;
    let formattedDate = "";

    while (day <= endDateWeek) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        const isSelected = (start && isSameDay(day, start)) || (end && isSameDay(day, end));
        const isInRange = start && end && isWithinInterval(day, { start, end });
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={`relative flex items-center justify-center aspect-square text-[13px] cursor-pointer transition-all
              ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
              ${isSelected ? "z-10" : ""}
            `}
            onClick={() => handleDateClick(cloneDay)}
          >
            {isInRange && (
              <div className={`absolute inset-0 bg-[#3A8D9D]/10 
                ${isSameDay(day, start!) ? "rounded-l-full" : ""}
                ${isSameDay(day, end!) ? "rounded-r-full" : ""}
              `} />
            )}
            <span className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all
              ${isSelected ? "bg-[#3A8D9D] text-white font-bold shadow-lg shadow-[#3A8D9D]/20 scale-110" : "hover:bg-gray-100"}
            `}>
              {formattedDate}
            </span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="p-2">{rows}</div>;
  };

  const getDisplayText = () => {
    if (!startDate && !endDate) return 'Tất cả thời gian';
    if (startDate && !endDate) return `Từ ${format(parseISO(startDate), 'dd/MM/yyyy')}`;
    if (startDate && endDate) return `${format(parseISO(startDate), 'dd/MM/yyyy')} - ${format(parseISO(endDate), 'dd/MM/yyyy')}`;
    return 'Chọn ngày';
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-[10px] cursor-pointer transition-all hover:border-gray-200
          ${isOpen ? 'border-[#3A8D9D] ring-4 ring-[#3A8D9D]/5 bg-white' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className={`w-3.5 h-3.5 ${startDate ? 'text-[#3A8D9D]' : 'text-gray-400'}`} />
        <span className={`text-[13px] font-medium whitespace-nowrap min-w-[140px] ${!startDate ? 'text-gray-400' : 'text-gray-700'}`}>
          {getDisplayText()}
        </span>
        {startDate && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onChange('', '');
            }}
            className="p-0.5 hover:bg-gray-200 rounded-full transition-colors ml-1"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-[110] bg-white border border-gray-100 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 w-[300px]">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
          
          <div className="p-3 border-t border-gray-50 flex items-center justify-between">
            <button 
              onClick={() => {
                const today = new Date();
                onChange(format(today, 'yyyy-MM-dd'), format(today, 'yyyy-MM-dd'));
                setIsOpen(false);
              }}
              className="text-[12px] font-bold text-[#3A8D9D] hover:underline"
            >
              Hôm nay
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-1.5 bg-[#3A8D9D] text-white text-[12px] font-bold rounded-lg hover:bg-[#2d6e7a] transition-colors"
            >
              Áp dụng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
