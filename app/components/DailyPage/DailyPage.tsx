"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import HabitTracker from "@/app/components/Habits/HabitTracker";
import TodoBox from "@/app/components/ToDo/ToDoBox";
import MomentsSection from "@/app/components/Moments/MomentsSection";
import BookmarkBlock from "@/app/components/Bookmark/BookmarkBlock";
import { Habit } from "@/app/components/Models/Habit";
import { fetchYearlyGoals } from "@/lib/yearly-goals/yearly-goal";
import YearBlock from "../Goals/YearBlock";
import { fetchHabits } from "@/lib/habits/habit";
import {
  fetchHabitCompletions,
  toggleHabitCompletion,
} from "@/lib/HabitCompletion/habitcompletion";
import { getCurrentWeekDates } from "@/lib/HabitCompletion/getCurrentWeekDates";
import { buildCompletionMap } from "@/lib/HabitCompletion/buildCompletionMap";
import { CompletionMap } from "../Models/CompletionMap";
export default function DailyPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completionMap, setCompletionMap] = useState<CompletionMap>({});
  const { status } = useSession();
 const [goalsByYear, setGoalsByYear] = useState<Record<string, any[]>>({});
  const currentYear = new Date().getFullYear().toString();

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
  
  const dates = getCurrentWeekDates();

  useEffect(() => {
    if (status !== "authenticated") return;

    async function load() {
      const habits = await fetchHabits();
      setHabits(habits);

      if (!habits.length) return;

      const completions = await fetchHabitCompletions(
     habits.map((h: any) => h._id),

        dates
      );

      setCompletionMap(buildCompletionMap(completions));
    }

    load();
  }, [status]);

  async function onToggle(habitId: string, date: string) {
    const current = completionMap[habitId]?.[date] ?? false;

    const updated = await toggleHabitCompletion(habitId, date, !current);

    setCompletionMap(prev => ({
      ...prev,
      [updated.habitId]: {
        ...prev[updated.habitId],
        [updated.date]: updated.completed,
      },
    }));
  }

  return (
    <div className="flex justify-center py-6 md:py-10">
      <BookmarkBlock />

      {/* Notebook */}
      <div
        className="
          flex flex-col md:flex-row
          bg-[#faf9f7]
          w-[85vw]
          max-w-[1200px]
          border border-black/30
          rounded-md
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]
          overflow-hidden
        "
      >
        {/* LEFT PAGE — DAILY */}
        <section
          className="
            w-full md:w-1/2
            p-4
            border-b md:border-b-0
            md:border-r
            border-black/20
          "
        >
          <h2 className="font-handwriting text-[18px] mb-3">
            Today
          </h2>

          <HabitTracker
            habits={habits}
            completionMap={completionMap}
            dates={dates}
            onToggle={onToggle}
          />

          <div className="my-4 border-t border-black/20" />

          <TodoBox />
        </section>

        {/* RIGHT PAGE — REFLECT */}
        <section className="w-full md:w-1/2 p-4">
          <h2 className="font-handwriting text-[18px] mb-3">
            Reflect
          </h2>

          <MomentsSection />
            <div className="space-y-4">
             {Object.entries(goalsByYear).map(([year, goals]) => (
               <YearBlock
                 key={year}
                 year={year}
                 goals={goals}
                 setGoalsByYear={setGoalsByYear}
               />
             ))}
           </div>

          
        </section>
      </div>
    </div>
  );
}
