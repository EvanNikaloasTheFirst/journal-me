"use client";
import { useState } from "react";

export default function ActionGenerator({
  goal,
  onConfirm,
}: {
  goal: string;
  onConfirm: (actions: { text: string; frequency: "daily" | "weekly" }[]) => void;
}) {
  const [actions, setActions] = useState([
    { text: "", frequency: "daily" as const },
    { text: "", frequency: "daily" as const },
    { text: "", frequency: "weekly" as const },
  ]);

  return (
    <div className="space-y-3">
      <p className="font-handwriting text-[13px]">
        To move <strong>{goal}</strong> forward, what are the 3 most important actions?
      </p>

      {actions.map((action, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={action.text}
            onChange={(e) =>
              setActions((prev) =>
                prev.map((a, idx) =>
                  idx === i ? { ...a, text: e.target.value } : a
                )
              )
            }
            placeholder={`Action ${i + 1}`}
            className="
              flex-1
              border border-black/40
              rounded-sm
              px-2 py-1
              text-[12px]
              bg-transparent
            "
          />

          <select
            value={action.frequency}
            onChange={(e) =>
              setActions((prev) =>
                prev.map((a, idx) =>
                  idx === i
                    ? { ...a, frequency: e.target.value as any }
                    : a
                )
              )
            }
            className="
              text-[11px]
              border border-black/40
              rounded-sm
              px-1
            "
          >
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
          </select>
        </div>
      ))}

      <button
        onClick={() => onConfirm(actions)}
        className="
          font-handwriting
          text-[11px]
          border border-black/40
          rounded-sm
          px-3 py-1
          hover:bg-lime-200/40
        "
      >
        Lock Actions
      </button>
    </div>
  );
}
