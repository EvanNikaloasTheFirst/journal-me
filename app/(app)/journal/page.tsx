import Bookmark from "../../components/Bookmark/Bookmark";
import HabitTracker from "../../components/Habits/HabitTracker";
import JournalSection from "../../components/Journal/JournalSection";
import BookmarkBlock from "../../components/Bookmark/BookmarkBlock";

export default function Journal() {
  return (
    <div className="mx-auto max-w-4xl px-4 space-y-8 mt-10">
      {/* BOOKMARKS */}
      <BookmarkBlock />

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
    </div>
  );
}
