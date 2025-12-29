"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CompletionMap } from "@/app/components/Models/CompletionMap";
import { Habit } from "../../components/Models/Habit";
import { fetchHabits } from "@/lib/habits/habit";
import {
  fetchHabitCompletions,
  toggleHabitCompletion,
} from "@/lib/HabitCompletion/habitcompletion";
import { getCurrentWeekDates } from "@/lib/HabitCompletion/getCurrentWeekDates";
import { buildCompletionMap } from "@/lib/HabitCompletion/buildCompletionMap";
import DailyPage from "@/app/components/DailyPage/DailyPage";
import { fetchYearlyGoals } from "@/lib/yearly-goals/yearly-goal";


export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completionMap, setCompletionMap] = useState<CompletionMap>({});
 

  const { status } = useSession();
  const dates = getCurrentWeekDates();
  
  useEffect(() => {
    if (status !== "authenticated") return;

    async function loadData() {
      const habits = await fetchHabits();
      setHabits(habits);

      const dates = getCurrentWeekDates();
      const habitIds = habits.map((h:any) => h._id);

      if (habitIds.length === 0) {
        setCompletionMap({});
        return;
      }

      const completions = await fetchHabitCompletions(habitIds, dates);
      setCompletionMap(buildCompletionMap(completions));
    }

    loadData();
  }, [status]);





async function onToggle(habitId: string, date: string) {
  const current = completionMap[habitId]?.[date] ?? false;

  const updated = await toggleHabitCompletion(
    habitId,
    date,
    !current
  );

  setCompletionMap((prev: any) => ({
    ...prev,
    [updated.habitId]: {
      ...prev[updated.habitId],
      [updated.date]: updated.completed,
    },
  }));
}


  return (
<div className="flex justify-center py-10 h-fit ">
   <DailyPage/>


    </div>
  );
}
