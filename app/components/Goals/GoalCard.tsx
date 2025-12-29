type Goal = {
  title: string;
  description?: string;
};

export default function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div
      className="
        relative
        p-3
        border border-black/40
        rounded-sm
        bg-[#fffdf6]
        shadow-[2px_2px_0_rgba(0,0,0,0.25)]
      "
    >
      {/* Pin */}
      <div className="absolute -top-2 left-3 text-xs">📌</div>

      <div className="flex justify-between items-start">
        <p className="font-handwriting text-[14px]">
          ☐ {goal.title}
        </p>

        {/* Controls */}
        <div className="flex gap-2 text-[10px] opacity-60">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>

      {goal.description && (
        <p className="font-handwriting text-[11px] mt-1 opacity-80">
          — {goal.description}
        </p>
      )}
    </div>
  );
}
