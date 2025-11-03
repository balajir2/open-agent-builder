"use client";

import { useEffect, useRef, useState } from 'react';
import { Folder, X } from 'lucide-react';

interface FileLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileType: string;
  location: string;
}

/**
 * Modal component for displaying the downloaded file location
 */
export function FileLocationModal({ isOpen, onClose, fileType, location }: FileLocationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Add ESC key handler
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full m-4 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-4">
          <div className="mx-auto bg-blue-100 dark:bg-blue-900 p-3 rounded-full inline-flex mb-3">
            <Folder className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">File Downloaded Successfully</h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your {fileType} has been downloaded and saved to:
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-mono break-all">{location}</p>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Depending on your browser settings, the file might be automatically opened or saved to a different location.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md font-medium text-sm transition-colors dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-blue-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}