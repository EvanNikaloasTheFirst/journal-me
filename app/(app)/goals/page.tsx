"use client"
import Bookmark from "../../components/Bookmark/Bookmark";
import GoalsSection from "../../components/Goals/GoalsSection";
import BookmarkBlock from "../../components/Bookmark/BookmarkBlock";
import { FeatureCard } from "@/app/components/Help/FeatureCard";
import { FeatureDetailPane } from "@/app/components/Help/FeatureDetailPane";
import { ActiveFeature } from "@/app/components/DailyPage/DailyPage";
import { useState } from "react";
export default function GoalsPage() {
    const [activeFeature, setActiveFeature] = useState<ActiveFeature | null>(null);
  
  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8 mt-10">
      {/* BOOKMARKS */}
      <BookmarkBlock />
      <FeatureCard
  title="Yearly Goals"
  imageUrl="/yearlygoals.png"
  onOpen={(data) =>
    setActiveFeature({
      title: data.title,
      description:
        "Keep a small, meaningful set of goals for the year ahead.",
      imageUrl: data.imageUrl,
      points: [
  "Decide what really matters this year",
  "Keep only a few meaningful goals",
  "Check goals off when they’re complete",
  "See how far you’ve come over time",
  "Adjust your goals as your priorities change",
]

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
          Goals
        </h2>




        <GoalsSection />
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
