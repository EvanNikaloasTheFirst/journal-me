"use client";
import { useEffect } from "react";
import { FeatureCard } from "@/app/components/Help/FeatureCard";
import { FeatureDetailPane } from "@/app/components/Help/FeatureDetailPane";
import { Habit } from "../../components/Models/Habit";
import { fetchHabits } from "@/lib/habits/habit";
import {
  fetchHabitCompletions,
  toggleHabitCompletion,
} from "@/lib/HabitCompletion/habitcompletion";
import { getCurrentWeekDates } from "@/lib/HabitCompletion/getCurrentWeekDates";
import { buildCompletionMap } from "@/lib/HabitCompletion/buildCompletionMap";
import { useSession } from "next-auth/react";
import { ActiveFeature } from "@/app/components/DailyPage/DailyPage";
import HabitTracker from "../../components/Habits/HabitTracker";
import PageDivider from "../../components/HelperComponents/PageDivider";
import BookmarkBlock from "../../components/Bookmark/BookmarkBlock";
import GoalFlow from "../../components/Goals/GoalSelection/GoalFlow";
import { useState } from "react";
import { CompletionMap } from "@/app/components/Models/CompletionMap";
export default function HabitPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completionMap, setCompletionMap] = useState<CompletionMap>({});
  const [activeFeature, setActiveFeature] = useState<ActiveFeature | null>(null);

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
    <div className="mx-auto max-w-4xl px-4 space-y-8 mt-10 ">
      <BookmarkBlock />

      <main
        className="
          bg-[#faf9f7]
          rounded-md
         border border-black/30
          rounded-md
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]
          p-6

        "
      >
        <h2 className="font-handwriting text-[18px] mb-4 border-b border-black/20 pb-1">
          Habit Tracker (This Week)
        </h2>

         <HabitTracker
                  habits={habits}
                  completionMap={completionMap}
                  dates={dates}
                  onToggle={onToggle}
                />
      </main>

      <PageDivider />
       <FeatureCard
  title="Manage Your Habits"
  imageUrl="/managehabits.png"
  onOpen={(data) =>
    setActiveFeature({
      title: data.title,
      description:
        "Define what you’re working toward and shape the habits that support it.",
      imageUrl: data.imageUrl,
      points: [
        "Set a clear intention for what you want to move forward",
        "Create habits that align with that goal",
        "Keep active habits visible and focused",
        "Archive habits without losing their history",
        "Delete habits that no longer matter",
      ],
    })
  }
/>

      <section
        className="
          bg-white
          border border-black/30
          rounded-md
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]
          p-5
          mb-10

        "
      >

        <div>
<h2 className="font-handwriting text-[16px] mb-3 border-b border-black/20 pb-1">
          Manage Habits
        </h2>

 

        </div>
        
        
{activeFeature && (
  <FeatureDetailPane
    title={activeFeature.title}
    description={activeFeature.description}
    imageUrl={activeFeature.imageUrl}
    points={activeFeature.points}
    onClose={() => setActiveFeature(null)}
  />
)}

        <GoalFlow />
      </section>
      
    </div>
  );
}
