import { Goal } from "../../Models/Goal";
import { Habit } from "../../Models/Habit";
export function GoalRow({
  habit,
  activeGoalId,
  onSelect,
  onToggleArchive,
  onUpdate,
  onDelete,
}: {
  habit: Habit;
  activeGoalId: string | null;
  onSelect: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onUpdate: (goal: Habit) => void;
  onDelete: (id: string) => void;
}) {
  const isActive = activeGoalId === habit._id;

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
        value={habit.name}
        onFocus={() => onSelect(habit._id)}
        onChange={(e) =>
          onUpdate({
            ...habit,
            name: e.target.value,

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
          onClick={() => onToggleArchive(habit._id)}
          className="underline"
        >
          {habit.archived ? "unarchive" : "archive"}
        </button>

        <button
          onClick={() => onDelete(habit._id)}
          className="underline text-red-600"
        >
          delete
        </button>
      </div>
    </div>
  );
}
