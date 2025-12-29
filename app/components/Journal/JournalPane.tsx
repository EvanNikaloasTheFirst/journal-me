"use client";

import { useState } from "react";

type Props = {
  onSave: (title: string, text: string) => void;
};

export default function JournalPane({ onSave }: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  function handleSave() {
  if (!text.trim()) return;

  if (!title.trim()) {
    alert("Title cannot be empty");
    return;
  }

  if (!text.trim()) {
    alert("entry cannot be empty");
    return;
  }

  onSave(title.trim(), text.trim());
  setTitle("");
  setText("");
}


  return (
    <div className="border border-black/30 rounded-md p-3 space-y-2 shadow-[3px_4px_0px_rgba(0,0,0,0.15)]">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry title..."
        className="w-full bg-transparent border-b border-black/30 outline-none text-[12px] font-handwriting pb-1"
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full min-h-[120px] bg-transparent resize-none outline-none text-[12px]"
      />

      <button
        onClick={handleSave}
        className="font-handwriting text-[10px] px-3 py-1 border border-black/40 rounded-sm"
      >
        Save Entry
      </button>
    </div>
  );
}
