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
import { Habit } from "../../Models/Habit";
import { useSession } from "next-auth/react";

export default function GoalFlow() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [draftGoal, setDraftGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  /* ================= LOAD ================= */
useEffect(() => {
  async function loadHabits() {
    const res = await fetch("/api/habits");
    const data: Habit[] = await res.json();

    const mapped = data.map((h) => ({
      _id: h._id,
      title: h.name,
      archived: h.archived ?? false,
      createdAt:h.createdAt,
      name:h.name,
      userId: h.userId
    }));

    setHabits(mapped)

  }

  loadHabits();
}, []);


  /* ================= CREATE ================= */
async function submit() {
  if (!draftGoal) return;

  try {
    setLoading(true);

    // ✅ count ONLY active (unarchived) goals
    const activeGoalsCount = habits.filter((g:any)=> !g.archived).length;



    // ✅ archive automatically if already 8 active goals
    const archiveValue = activeGoalsCount >= 8;

    const habit = await createHabit(draftGoal, archiveValue);

    const newGoal: Habit = {
      _id: habit.id,
      userId:session?.user?.email || "",
      name: habit.name,
      archived: archiveValue,
      createdAt:new Date()
    };
   

    setHabits(prev => [newGoal, ...prev]);
    setActiveGoalId(newGoal._id);
    setDraftGoal(null);
  } finally {
    setLoading(false);
  }
}



  /* ================= UPDATE ================= */
async function save(habit: Habit) {
  const updated = await updateHabit(habit._id,habit.name, habit.archived,
  );

  setHabits((prev) =>
    prev.map((g) => (g._id === habit._id ? habit : g))
  );
}

  /* ================= DELETE ================= */
async function remove(id: string) {
  const confirmed = window.confirm(
    "⚠️ This will permanently delete this habit and ALL of its history.\n\nThis action cannot be undone.\n\nDo you want to continue?"
  );

  if (!confirmed) return;

  await deleteHabit(id);

  setHabits((prev) => prev.filter((g) => g._id !== id));
}

  /* ================= TOGGLE ================= */
async function toggleArchive(id: string) {
  const habit = habits.find((g) => g._id === id);
  if (!habit) return;

  // 🚫 prevent unarchive if already 8 active goals
  if (habit.archived) {
    const activeCount = habits.filter((g) => !g.archived).length;

    if (activeCount >= 8) {
      alert("You can only have 8 active goals");
      return;
    }
  }

  const updated: Habit = {
    ...habit,
    archived: !habit.archived,
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
        actions={habits}
        activeGoalId={activeGoalId}
        onSelect={setActiveGoalId}
        onToggleArchive={toggleArchive}
        onUpdate={save}
        onDelete={remove}
      />
    </div>
  );
}
