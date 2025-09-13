"use client";
import React, { useState } from "react";

export function Lightbox({
  images,
  index,
  onClose,
}: {
  images: string[];
  index: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(index);
  if (!images?.length) return null;

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>
      <div className="relative w-full max-w-5xl px-4">
        <img
          src={images[i]}
          alt="screenshot"
          className="w-full h-auto rounded-xl shadow-2xl"
        />
        <div className="mt-4 flex items-center justify-between text-white/80">
          <button
            className="px-3 py-1 rounded-lg ring-1 ring-white/30 hover:bg-white/10"
            onClick={() => setI((p) => (p - 1 + images.length) % images.length)}
          >
            Prev
          </button>
          <div className="text-sm">
            {i + 1} / {images.length}
          </div>
          <button
            className="px-3 py-1 rounded-lg ring-1 ring-white/30 hover:bg-white/10"
            onClick={() => setI((p) => (p + 1) % images.length)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
