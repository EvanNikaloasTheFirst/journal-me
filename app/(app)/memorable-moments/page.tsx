"use client";

import BookmarkBlock from "../../components/Bookmark/BookmarkBlock";
import { FeatureCard } from "@/app/components/Help/FeatureCard";
import { FeatureDetailPane } from "@/app/components/Help/FeatureDetailPane";
import { ActiveFeature } from "@/app/components/DailyPage/DailyPage";
import MomentsSection from "../../components/Moments/MomentsSection";
import { useState } from "react";
import MomentsHub from "@/app/components/Moments/MomentsHub";

export default function MomentsPage() {
  const [activeFeature, setActiveFeature] = useState<ActiveFeature | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8 mt-10">
      <BookmarkBlock />

      <FeatureCard
        title="Memorable Moments"
        imageUrl="/moments.png"
        onOpen={(data) =>
          setActiveFeature({
            title: data.title,
            description:
              "A timeline of meaningful memories, organised by year and month.",
            imageUrl: data.imageUrl,
            points: [
              "Capture small but meaningful moments",
              "See memories grouped by time",
              "Reflect on how life evolves year to year",
              "Relive moments you might otherwise forget",
              "Build a personal memory archive",
            ],
          })
        }
      />

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
  Moments
</h2>

<p className="text-xs opacity-60 mb-4">
  A quiet place to capture meaningful moments — small memories, thoughts, or events worth remembering over time.
</p>

        <MomentsHub/>
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
