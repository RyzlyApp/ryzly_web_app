"use client";

import React, { useRef, useState, useCallback } from "react";

interface ImageModalProps {
  onInsertFile: (file: File) => void;
  onClose: () => void;
  progress?: number;
}

const ImageModal: React.FC<ImageModalProps> = ({ onInsertFile, onClose, progress = 0 }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onInsertFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onInsertFile(e.dataTransfer.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-[400px] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">Upload Image</h2>

        <div
          className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {dragActive ? "Drop image here..." : "Click or drag image here"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
