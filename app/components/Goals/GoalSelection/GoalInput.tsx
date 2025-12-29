"use client";
import { useState } from "react";

export default function GoalInput({
  onSubmit,
}: {
  onSubmit: (goal: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <p className="font-handwriting text-[14px]">
        What’s the main thing you want to move forward?
      </p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. Build a sustainable fitness routine"
        className="
          w-full
          border border-black/40
          rounded-sm
          px-2 py-1
          text-[12px]
          bg-transparent
        "
      />

      <button
        type="button"
        onClick={() => {
          if (!value.trim()) return;

          onSubmit(value);   // ✅ THIS WAS MISSING
          setValue("");
        }}
        className="
          font-handwriting
          text-[11px]
          border border-black/40
          rounded-sm
          px-3 py-1
          hover:bg-green-200/40
        "
      >
        Set Goal
      </button>
    </div>
  );
}
