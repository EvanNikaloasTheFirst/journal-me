"use client";

import { useEffect, useState } from "react";
import YearBlock from "./YearBlock";
import AddGoalModal from "./AddGoalModal";

import {
  createYearlyGoal,
  fetchYearlyGoals,
} from "@/lib/yearly-goals/yearly-goal";
import { YearlyGoal } from "../Models/YearlyGoals";

type GoalsForYear = {
  year: string;
  goals: YearlyGoal[];
  completed: boolean;
};

export default function GoalsSection() {
  const currentYear = new Date().getFullYear().toString();

const [goalsByYear, setGoalsByYear] = useState<Record<string, YearlyGoal[]>>({});

const [open, setOpen] = useState(false);


  // ✅ FETCH ON LOAD
  useEffect(() => {
    async function loadGoals() {
      try {
        const goals = await fetchYearlyGoals(currentYear);

        setGoalsByYear({
          [currentYear]: goals,
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadGoals();
  }, [currentYear]);

const yearlyGoals: GoalsForYear[] = Object.entries(goalsByYear).map(
  ([year, goals]) => ({
    year,
    goals,
    completed: goals.length > 0 && goals.every(g => g.completed),
  })
);



  async function addGoal(text: string) {
    try {
      const goal = await createYearlyGoal(text, currentYear);

      setGoalsByYear((prev) => ({
        ...prev,
        [currentYear]: [
          ...(prev[currentYear] || []),
          goal, // 👈 use server response
        ],
      }));
    } catch (err) {
      console.error(err);
      // alert("Failed to add goal");
    }
  }

  return (
    <div className="p-4 w-[85%] mx-auto">
      <div className="border border-black/30 rounded-md shadow-[3px_4px_0px_rgba(0,0,0,0.15)] p-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-handwriting text-[16px]">
            Yearly Goals ✨
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="font-handwriting text-[10px] border border-black/30 rounded-md shadow-[3px_4px_0px_rgba(0,0,0,0.15)] px-2 py-1 hover:translate-y-[1px] transition"
          >
            Add Goal
          </button>
        </div>

        <div className="space-y-4">
{yearlyGoals.map((yg) => (
  <YearBlock
    key={yg.year}
    year={yg.year}
    goals={yg.goals}
    setGoalsByYear={setGoalsByYear}
  />
))}


        </div>

        {open && (
          <AddGoalModal
            onClose={() => setOpen(false)}
            onSubmit={addGoal}
          />
        )}
      </div>
    </div>
  );
}
