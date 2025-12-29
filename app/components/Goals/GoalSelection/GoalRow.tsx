import { Goal } from "../../Models/Goal";
export function GoalRow({
  goal,
  activeGoalId,
  onSelect,
  onToggleArchive,
  onUpdate,
  onDelete,
}: {
  goal: Goal;
  activeGoalId: string | null;
  onSelect: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onUpdate: (goal: Goal) => void;
  onDelete: (id: string) => void;
}) {
  const isActive = activeGoalId === goal._id;

  return (
    <div
      className={`
        border border-black/30
        rounded-sm
        p-2
        space-y-1
        ${isActive ? "bg-yellow-100/40" : "bg-[#faf9f7]"}
      `}
    >
      <input
        value={goal.goal}
        onFocus={() => onSelect(goal._id)}
        onChange={(e) =>
          onUpdate({
            ...goal,
            goal: e.target.value,
          })
        }
        className="
          w-full
          bg-transparent
          outline-none
          font-handwriting
          text-[12px]
        "
      />

      <div className="flex gap-3 text-[10px]">
        <button
          onClick={() => onToggleArchive(goal._id)}
          className="underline"
        >
          {goal.completed ? "unarchive" : "archive"}
        </button>

        <button
          onClick={() => onDelete(goal._id)}
          className="underline text-red-600"
        >
          delete
        </button>
      </div>
    </div>
  );
}
