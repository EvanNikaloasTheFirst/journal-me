"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (text: string) => void;
};

export default function AddMomentModal({ onClose, onSave }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="
          w-[90%] max-w-sm
          bg-[#f6f1e7]
          border-2 border-black/40
          rounded-md
          p-4
          shadow-[3px_4px_0_rgba(0,0,0,0.2)]
          font-handwriting
        "
      >
        <h3 className="text-[15px] mb-2 tracking-wide">
          Add a moment ✍️
        </h3>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 300))}
          placeholder="Something small, honest, meaningful..."
          className="
            w-full
            h-28
            resize-none
            bg-transparent
            border
            border-black/30
            rounded-sm
            p-2
            text-[12px]
            leading-relaxed
            outline-none
          "
        />

        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-black/60">
            {text.length}/300
          </span>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="
                text-[11px]
                underline
                decoration-black/40
                underline-offset-4
              "
            >
              cancel
            </button>

            <button
              onClick={() => {
                if (text.trim()) {
                  onSave(text.trim());
                  onClose();
                }
              }}
              className="
                border-2 border-black/40
                px-3 py-1
                rounded-sm
                text-[11px]
                shadow-[1px_1px_0_rgba(0,0,0,0.2)]
                hover:translate-y-[1px]
                hover:shadow-none
                transition
              "
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
