"use client";
import { useState } from "react";

export default function AddGoalModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");

  function handleSubmit() {
    if (!text.trim()) return;
    onSubmit(text.trim());
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-[#fffdf5] border-2 border-black/40 rounded-md p-4 w-[300px]">
        <h3 className="font-handwriting text-[14px] mb-2">
          New Goal
        </h3>

        <textarea
          maxLength={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="
            w-full
            h-24
            border border-black/40
            rounded-sm
            p-2
            font-handwriting
            text-[12px]
            resize-none
          "
          placeholder="What do you want this year?"
        />

        <div className="flex justify-between mt-2">
          <span className="text-[9px] opacity-50">
            {text.length}/500
          </span>

        <button
  onClick={handleSubmit}
  className="
    font-handwriting
    text-[10px]
    px-3 py-1
    border border-green-700/50
    bg-green-200/40
    text-green-900
    rounded-sm
    shadow-[1px_1px_0_rgba(0,0,0,0.2)]
    hover:translate-y-[1px]
    hover:shadow-none
    transition
  "
>
  Save
</button>

<button
  onClick={onClose}
  className="
    font-handwriting
    text-[10px]
    px-3 py-1
    border border-red-700/50
    bg-red-200/40
    text-red-900
    rounded-sm
    shadow-[1px_1px_0_rgba(0,0,0,0.2)]
    hover:translate-y-[1px]
    hover:shadow-none
    transition
  "
>
  Close
</button>

        </div>
      </div>
    </div>
  );
}
