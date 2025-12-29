import { Goal } from "../../Models/Goal";
import { GoalRow } from "./GoalRow";
type Props = {
  actions: Goal[];
  activeGoalId: string | null;
  onSelect: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onUpdate: (goal: Goal) => void;
  onDelete: (id: string) => void;
};

export default function GoalList({
  actions,
  activeGoalId,
  onSelect,
  onToggleArchive,
  onUpdate,
  onDelete,
}: Props) {
  const active = actions.filter((g) => !g.completed);
  const archived = actions.filter((g) => g.completed);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ================= ACTIVE ================= */}
      <div>
        <h3 className="mb-2 font-handwriting text-[13px] underline">
          Active
        </h3>

        <div className="space-y-2">
          {active.map((goal) => (
            <GoalRow
              key={goal._id}
              goal={goal}
              activeGoalId={activeGoalId}
              onSelect={onSelect}
              onToggleArchive={onToggleArchive}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}

          {active.length === 0 && (
            <p className="text-[11px] opacity-60">No active habits</p>
          )}
        </div>
      </div>

      {/* ================= ARCHIVED ================= */}
      <div>
        <h3 className="mb-2 font-handwriting text-[13px] underline">
          Archived
        </h3>

        <div className="space-y-2 opacity-70">
          {archived.map((goal) => (
            <GoalRow
              key={goal._id}
              goal={goal}
              activeGoalId={activeGoalId}
              onSelect={onSelect}
              onToggleArchive={onToggleArchive}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}

          {archived.length === 0 && (
            <p className="text-[11px] opacity-60">No archived habits</p>
          )}
        </div>
      </div>
    </div>
  );
}
