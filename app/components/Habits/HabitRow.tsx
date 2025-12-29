"use client";

import { Habit } from "../Models/Habit";

type Props = {
  habit: Habit;
  dates: string[];
  completions: { [date: string]: boolean };
  onToggle: (habitId: string, date: string) => void;
};

const COLORS = [
  "bg-red-200/40",
  "bg-blue-200/40",
  "bg-green-200/40",
  "bg-purple-200/40",
  "bg-pink-200/40",
  "bg-orange-200/40",
];

export default function HabitRow({
  habit,
  dates,
  completions,
  onToggle,
}: Props) {


  // stable color per row (doesn't change on rerender)
  const rowColor =
       COLORS[habit._id.charCodeAt(0) % COLORS.length];

 return (
  <>
    {/* LABEL CELL */}
  <div className="h-6 border-r border-black flex items-center px-1">
<span className="relative right-[7px] text-[12px] tracking-wide break-words leading-tight">
    {habit.name}
  </span>
</div>


    {/* DAY CELLS */}
    {dates.map((date) => {
      const checked = completions[date] ?? false;

      return (
        <div
          key={date}
          onClick={() => onToggle(habit._id, date)}
          className={`
            h-6
            border border-black/70
            flex items-center justify-center
            cursor-pointer select-none
            transition
            ${checked ? rowColor : ""}
          `}
        >
          {checked && (
            <span
              className="
                font-handwriting
                text-[14px]
                rotate-[-8deg]
                text-black/80
              "
            >
              ✕
            </span>
          )}
        </div>
      );
    })}
  </>
);

}
