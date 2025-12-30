"use client";

import { Goal } from "../Models/Goal";
// import { updateYearlyGoal } from "@/lib/yearlyGoals/api";
import { updateYearlyGoal } from "@/lib/yearly-goals/yearly-goal";
import { deleteYearlyGoal } from "@/lib/yearly-goals/yearly-goal";

import { YearlyGoal } from "../Models/YearlyGoals";

type Props = {
  year: string;
  goals: YearlyGoal[];
  setGoalsByYear: React.Dispatch<
    React.SetStateAction<Record<string, YearlyGoal[]>>
  >;
};

export default function YearBlock({
  year,
  goals,
  setGoalsByYear,
}: Props) {
  const completedCount = goals.filter(g => g.completed).length;


async function deleteGoal(id: string) {
  const confirmed = window.confirm(
    "⚠️ This will permanently delete this goal and ALL associated history.\n\nThis action cannot be undone.\n\nDo you want to continue?"
  );

  if (!confirmed) return;

  // optimistic update
  setGoalsByYear(prev => ({
    ...prev,
    [year]: prev[year].filter(g => g._id !== id),
  }));

  await deleteYearlyGoal(id);
}


  async function toggleGoal(id: string) {
    if (id == undefined || id.trim() == null) return;
  const goal = goals.find(g => g._id === id);
  if (!goal) return;

  const nextCompleted = !goal.completed;

  // optimistic update
  setGoalsByYear(prev => ({
    ...prev,
    [year]: prev[year].map(g =>
      g._id === id ? { ...g, completed: nextCompleted } : g
    ),
  }));

  await updateYearlyGoal(id, nextCompleted);
}


  return (
    <div className="border border-black/20 rounded-sm p-3">
      {/* YEAR HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-handwriting text-[14px]">{year}</h3>
        <span className="text-[10px] opacity-60">
          {completedCount}/{goals.length} completed
        </span>
      </div>

      {/* GOALS */}
      <ul className="space-y-2">
        {goals.map(goal => (
        
        <li
  key={goal._id}
  className={`
    flex items-start gap-2
    px-2 py-1 rounded-sm
    transition
    ${goal.completed ? "bg-lime-200/40" : ""}
  `}
>
<input
  type="checkbox"
  checked={goal.completed}
  onChange={() => {
    if (!goal._id) return;
    toggleGoal(goal._id);
  }}
/>


  <span
    className={`
      flex-1
      font-handwriting text-[12px]
      ${goal.completed ? "line-through opacity-60" : ""}
    `}
  >
    {goal?.goal}
  </span>

  {/* DELETE BUTTON */}
  <button
    onClick={() => {
     if (!goal._id) return;
      deleteGoal(goal._id)}
    }
     
    className="
      text-[10px]
      opacity-40
      hover:opacity-100
      hover:text-red-700
      transition
    "
    title="Delete goal"
  >
    ✕
  </button>
</li>

        ))}

        {goals.length === 0 && (
          <p className="text-[10px] opacity-50 italic">
            No goals yet this year
          </p>
        )}
      </ul>
    </div>
  );
}
