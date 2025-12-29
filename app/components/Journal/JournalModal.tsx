"use client";

import { useEffect } from "react";
import { Journal } from "../Models/Journal";
type Props = {

  entry: Journal;
  onClose: () => void;
};

export default function JournalModal({ entry, onClose }: Props) {
  // ESC key closes
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="
          absolute inset-0
          bg-black/30
          backdrop-blur-sm
        "
      />

      {/* MODAL */}
      <div
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[90vw] max-w-[600px]
          max-h-[80vh] overflow-y-auto
          bg-[#fffdf5]
          border border-black/40
          rounded-md
          p-4
          shadow-[4px_6px_0_rgba(0,0,0,0.2)]
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-handwriting text-[14px]">
            {entry.title}
          </h3>

          <button
            onClick={onClose}
            className="text-[12px] opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <p className="text-[12px] whitespace-pre-wrap leading-relaxed">
          {entry.text}
        </p>

        {/* FOOTER */}
        <p className="text-[9px] opacity-40 mt-4">
          {new Date(entry.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
