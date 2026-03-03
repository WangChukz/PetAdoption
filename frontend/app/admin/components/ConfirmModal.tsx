'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, X, Check, Trash2 } from 'lucide-react';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info';
  isLoading?: boolean;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy bỏ',
  type = 'warning',
  isLoading = false,
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const typeConfig = {
    warning: {
      icon: <AlertCircle className="w-6 h-6 text-orange-500" />,
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      button: 'bg-orange-500 hover:bg-orange-600 shadow-orange-200',
    },
    danger: {
      icon: <Trash2 className="w-6 h-6 text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-100',
      button: 'bg-red-500 hover:bg-red-600 shadow-red-200',
    },
    info: {
      icon: <AlertCircle className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      button: 'bg-[#3A8D9D] hover:bg-[#2d6f7c] shadow-blue-200',
    },
  };

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content - Sharp Minimalist Centered */}
      <div className="relative w-full max-w-[400px] bg-white rounded-[10px] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-100 mx-4">
        <div className="p-6 md:p-8 flex flex-col items-center">
          {/* Header */}
          <div className="mb-2 md:mb-3 text-center">
            <h3 className="text-[17px] md:text-[18px] font-semibold font-menu text-[#1a1a1a] leading-tight tracking-tight">
              {title}
            </h3>
          </div>
          
          <div className="mb-6 md:mb-8 text-center">
            <p className="text-[13.5px] md:text-[14px] text-gray-500 font-menu leading-relaxed font-normal">
              {message}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 w-full justify-center">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-[8px] font-menu font-medium text-[13px] md:text-[13.5px] text-white bg-[#f08c50] hover:bg-[#e07b40] transition-all active:scale-95 disabled:opacity-50 shadow-sm whitespace-nowrap min-w-[120px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xử lý</span>
                </div>
              ) : confirmText}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-[8px] font-menu font-medium text-[13px] md:text-[13.5px] text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-50 border border-gray-100 whitespace-nowrap min-w-[120px]"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
