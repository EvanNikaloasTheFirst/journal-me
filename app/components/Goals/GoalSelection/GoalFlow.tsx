"use client";

import { useEffect, useState } from "react";
import GoalInput from "./GoalInput";
import GoalList from "./GoalList";
import { Goal } from "../../Models/Goal";
import {
  createHabit,
  updateHabit,
  deleteHabit,
} from "@/lib/habits/habit";

export default function GoalFlow() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [draftGoal, setDraftGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    async function loadHabits() {
      const res = await fetch("/api/habits");
      const data = await res.json();

      const mapped = data.map((h: any) => ({
        id: h._id || h.id,
        title: h.name,
        archived: h.archived ?? false,
      }));

      setGoals(mapped);
    }

    loadHabits();
  }, []);

  /* ================= CREATE ================= */
async function submit() {
  if (!draftGoal) return;

  try {
    setLoading(true);

    // ✅ count ONLY active (unarchived) goals
    const activeGoalsCount = goals.filter((g:any)=> !g.archived).length;



    // ✅ archive automatically if already 8 active goals
    const archiveValue = activeGoalsCount >= 8;

    const habit = await createHabit(draftGoal, archiveValue);

    const newGoal: Goal = {
      _id: habit.id,
      goal: habit.name,
      completed: archiveValue,
    };

    setGoals(prev => [newGoal, ...prev]);
    setActiveGoalId(newGoal._id);
    setDraftGoal(null);
  } finally {
    setLoading(false);
  }
}



  /* ================= UPDATE ================= */
async function save(goal: Goal) {
  const updated = await updateHabit(goal._id,goal.goal, goal.completed,
  );

  setGoals((prev) =>
    prev.map((g) => (g._id === goal._id ? goal : g))
  );
}

  /* ================= DELETE ================= */
  async function remove(id: string) {
    await deleteHabit(id);
    setGoals((prev) => prev.filter((g) => g._id !== id));
  }

  /* ================= TOGGLE ================= */
async function toggleArchive(id: string) {
  const goal = goals.find((g) => g._id === id);
  if (!goal) return;

  // 🚫 prevent unarchive if already 8 active goals
  if (goal.completed) {
    const activeCount = goals.filter((g) => !g.completed).length;

    if (activeCount >= 8) {
      alert("You can only have 8 active goals");
      return;
    }
  }

  const updated: Goal = {
    ...goal,
    completed: !goal.completed,
  };

  await save(updated);
}


  return (
    <div className="space-y-4">
      {!draftGoal && <GoalInput onSubmit={setDraftGoal} />}

      {draftGoal && (
        <button
          onClick={submit}
          disabled={loading}
          className="
            font-handwriting
            text-[12px]
            border border-black/40
            rounded-sm
            px-3 py-1
            bg-green-200/40
          "
        >
          {loading ? "Saving..." : "Add goal"}
        </button>
      )}

      <GoalList
        actions={goals}
        activeGoalId={activeGoalId}
        onSelect={setActiveGoalId}
        onToggleArchive={toggleArchive}
        onUpdate={save}
        onDelete={remove}
      />
    </div>
  );
}
