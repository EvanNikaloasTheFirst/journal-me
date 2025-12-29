"use client";
import MomentItem from "./MomentItem";
import AddMomentModal from "./AddMomentModal";
import { useState } from "react";
import { Moment } from "../Models/Moment";
import { createMoment } from "@/lib/Moments/moment";
import { deleteMoment } from "@/lib/Moments/moment";
export default function MomentsSection() {
const [moments, setMoments] = useState<Moment[]>([]);

const [open, setOpen] = useState(false);
const monthLabel =
  moments[0]
    ? new Date(moments[0].year, moments[0].month).toLocaleString(
        "default",
        { month: "long", year: "numeric" }
      )
    : "This Month";


  return (
    <>
    <div className="p-3 w-full h-[230px] flex flex-col">
  {/* Header */}
  <div className="flex flex-col gap-2 mb-3 shrink-0">
    <h2 className="text-[22px] font-handwriting">
      Memorable Moments: {monthLabel}
    </h2>

    <p className="text-[12px] opacity-70 font-handwriting">
      What’s one win you had today?
    </p>

    <button
      onClick={() => setOpen(true)}
      className="
        self-start
        font-handwriting
        text-[11px]
        tracking-wide
        rounded-sm
        px-3 py-1
        shadow-[1px_1px_0_rgba(0,0,0,0.2)]
        hover:translate-y-[1px]
        hover:shadow-none
        transition
        border border-2
      "
    >
      Add Moment :)
    </button>
  </div>

  {/* Scrollable list */}
 <ol className="flex-1 space-y-2 text-[16px] overflow-y-scroll pr-2">
  {moments.map((moment, i) => (
   <MomentItem
  key={moment._id}
  index={i + 1}
  text={moment.text}
  onDelete={async () => {
    try {
 const confirmed = window.confirm(
    "Are you sure you want to delete this moment?"
  );

  if (!confirmed) return;

  try {
    await deleteMoment(moment._id);

    // update UI only after DB success
    setMoments((prev) =>
      prev.filter((m) => m._id !== moment._id)
    );
  } catch (err) {
    console.error("Failed to delete moment", err);
  }

    } catch (err) {
      console.error("Failed to delete moment", err);
    }
  }}
/>

  ))}
</ol>


  <p
    className="
      mt-2
      text-[10px]
      opacity-60
      font-handwriting
      italic
    "
  >
    (Scroll to see more 🙂)
  </p>
</div>

      {/* ✅ MODAL */}
      {open && (
  <AddMomentModal
    onClose={() => setOpen(false)}
    onSave={async (text: string) => {
      // optimistic
      const optimistic: Moment = {
        _id: crypto.randomUUID(),
        text,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        createdAt: new Date().toISOString()
      };

      setMoments((prev) => [optimistic, ...prev]);
      setOpen(false);

      try {
        const saved = await createMoment(text);

        setMoments((prev) =>
          prev.map((m) => (m._id === optimistic._id ? saved : m))
        );
      } catch {
        // rollback on failure
        setMoments((prev) =>
          prev.filter((m) => m._id !== optimistic._id)
        );
      }
    }}
  />
)}

    </>
  );
}
