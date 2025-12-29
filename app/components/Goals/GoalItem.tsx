"use client";
import { useState } from "react";

export default function GoalItem({ goal, year, setGoalsByYear }: any) {
  const [note, setNote] = useState(goal.note || "");

  function toggleComplete() {
    setGoalsByYear((prev: any) => ({
      ...prev,
      [year]: prev[year].map((g: any) =>
        g.id === goal.id
          ? { ...g, completed: !g.completed }
          : g
      ),
    }));
  }

  function saveNote() {
    setGoalsByYear((prev: any) => ({
      ...prev,
      [year]: prev[year].map((g: any) =>
        g.id === goal.id ? { ...g, note } : g
      ),
    }));
  }

  return (
    <div className="border border-black/20 rounded-sm p-2">
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={goal.completed}
          onChange={toggleComplete}
        />
        <span
          className={`
            font-handwriting
            text-[12px]
            ${goal.completed ? "line-through opacity-50" : ""}
          `}
        >
          {goal.text}
        </span>
      </label>

      {goal.completed && (
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={saveNote}
          placeholder="How did it feel?"
          className="
            mt-2
            w-full
            border border-black/30
            rounded-sm
            p-1
            font-handwriting
            text-[10px]
            resize-none
          "
        />
      )}
    </div>
  );
}
