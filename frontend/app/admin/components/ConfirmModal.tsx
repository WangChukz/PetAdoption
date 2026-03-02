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
      button: 'bg-[#f08c50] hover:bg-[#d16830]',
    },
    danger: {
      icon: <Trash2 className="w-6 h-6 text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-100',
      button: 'bg-red-600 hover:bg-red-700',
    },
    info: {
      icon: <AlertCircle className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
  };

  const config = typeConfig[type];

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${config.bg} ${config.border} border rounded-2xl flex items-center justify-center`}>
              {config.icon}
            </div>
            <button 
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <h3 className="text-[18px] font-black font-menu text-[#1a1a1a] mb-2 leading-tight">
            {title}
          </h3>
          
          <p className="text-[14px] text-gray-500 font-menu leading-relaxed">
            {message}
          </p>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl font-menu font-bold text-[13px] text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 transition disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2.5 rounded-xl font-menu font-bold text-[13px] text-white transition shadow-md disabled:opacity-70 ${config.button}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Đang xử lý...
              </div>
            ) : confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
