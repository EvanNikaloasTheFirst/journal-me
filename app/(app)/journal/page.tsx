"use client"
import Bookmark from "../../components/Bookmark/Bookmark";
import HabitTracker from "../../components/Habits/HabitTracker";
import JournalSection from "../../components/Journal/JournalSection";
import BookmarkBlock from "../../components/Bookmark/BookmarkBlock";
import { FeatureCard } from "@/app/components/Help/FeatureCard";
import { FeatureDetailPane } from "@/app/components/Help/FeatureDetailPane";
import { ActiveFeature } from "@/app/components/DailyPage/DailyPage";
import { useState } from "react";

export default function Journal() {
      const [activeFeature, setActiveFeature] = useState<ActiveFeature | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8 mt-10">
      {/* BOOKMARKS */}
      <BookmarkBlock />
<FeatureCard
  title="Daily Journalling"
  imageUrl="/journalling.png"
  onOpen={(data) =>
    setActiveFeature({
      title: data.title,
      description:
        "A quiet space to write freely and process your thoughts.",
      imageUrl: data.imageUrl,
      points: [
        "Write without structure or pressure",
        "Capture thoughts, feelings, or reflections",
        "Build a habit of daily self-check-ins",
        "Look back and notice patterns over time",
        "Keep entries private and distraction-free",
      ],
    })
  }
/>
      {/* NOTEBOOK PAGE */}
      <main
        className="
          bg-[#faf9f7]
          border border-black/30
          rounded-md
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]
          p-6
          min-h-[70vh]
          
        "
      >
        <h2 className="font-handwriting text-[18px] mb-4 border-b border-black/20 pb-1">
          Journal
        </h2>


        <JournalSection />
      </main>
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
