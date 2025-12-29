"use client";

import BookmarkBlock from "../../components/Bookmark/BookmarkBlock";
import { FeatureCard } from "@/app/components/Help/FeatureCard";
import { FeatureDetailPane } from "@/app/components/Help/FeatureDetailPane";
import { ActiveFeature } from "@/app/components/DailyPage/DailyPage";
import { useState } from "react";
import TodoBox from "@/app/components/ToDo/ToDoBox";

export default function TodosPage() {
  const [activeFeature, setActiveFeature] =
    useState<ActiveFeature | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8 mt-10">
      {/* BOOKMARKS */}
      <BookmarkBlock />

      {/* FEATURE HELP */}
      <FeatureCard
        title="To-Dos"
        imageUrl="/todos.png"
        onOpen={(data) =>
          setActiveFeature({
            title: data.title,
            description:
              "A simple place to capture tasks you want to get done — without overthinking it.",
            imageUrl: data.imageUrl,
            points: [
              "Quickly capture things on your mind",
              "Mark tasks as complete",
              "Delete tasks you no longer need",
              "Focus on what matters today",
              "Keep your mental space clear",
            ],
          })
        }
      />

      {/* NOTEBOOK PAGE */}
      <main
        className="
          bg-[#faf9f7]
          rounded-md
          border border-black/30
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]
          p-6
        "
      >
        <h2 className="font-handwriting text-[18px] mb-4 border-b border-black/20 pb-1">
          To-Dos
        </h2>


      </main>

      {/* FEATURE DETAIL PANE */}
      {activeFeature && (
        <FeatureDetailPane
          title={activeFeature.title}
          description={activeFeature.description}
          imageUrl={activeFeature.imageUrl}
          points={activeFeature.points}
          onClose={() => setActiveFeature(null)}
        />
      )}
    </div>
  );
}
