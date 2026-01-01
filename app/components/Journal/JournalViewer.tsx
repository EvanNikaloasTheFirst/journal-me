"use client";

import { useEffect } from "react";
import { Journal } from "../Models/Journal";

type Props = {
  entry: Journal;
  onClose: () => void;
  onUpdateDate: (id: string, date: string) => void;
};

export default function JournalViewer({
  entry,
  onClose,
  onUpdateDate,
}: Props) {
  // ESC to close
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
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[90vw] max-w-[680px]
          max-h-[85vh] overflow-y-auto
          bg-[#fffdf5]
          border border-black/40
          rounded-md
          p-4
          shadow-[4px_6px_0_rgba(0,0,0,0.25)]
        "
      >
        <div className="flex justify-between items-center mb-3 gap-2">
          <h2 className="font-handwriting text-[16px] flex-1">
            {entry.title}
          </h2>

          {/* DATE EDIT */}
          <input
            type="date"
            value={entry.createdAt.slice(0, 10)}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) =>
              onUpdateDate(entry._id, e.target.value)
            }
            className="
              text-xs
              border border-black/20
              rounded-sm
              px-2 py-1
            "
          />

          <button
            onClick={onClose}
            className="text-[14px] opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        <p className="text-[13px] whitespace-pre-wrap leading-relaxed">
          {entry.text}
        </p>

        <p className="text-[9px] opacity-40 mt-4">
          {new Date(entry.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
