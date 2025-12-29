import HabitRow from "./HabitRow";
import HabitDaysHeader from "./HabitDaysHeader";
import { Habit } from "../Models/Habit";
import { CompletionMap } from "../Models/CompletionMap";
import { getCurrentWeekDates } from "@/lib/HabitCompletion/getCurrentWeekDates";
const habits = [
  "Meditation",
  "Journal",
  "Gym",
  "Breathwork",
  "1.5L Water",
  "Socials",
  "Cold exp.",
];
type Props = {
  habits: Habit[];
  completionMap: CompletionMap;
  dates: string[];
  onToggle: (habitId: string, date: string) => void;
};
export default function HabitGrid({
  habits,
  completionMap,
  onToggle,
  dates
}: Props) {


  return (
    <div className="overflow-x-auto">
      <div
        className="
          grid
          grid-cols-[48px_repeat(7,1fr)]
          border border-black
          bg-[#faf6ee]
        "
      >
        {/* DAYS */}
        <HabitDaysHeader />

        {/* HABITS */}
      {habits.map((habit) => (
  <HabitRow
    key={habit._id}
    habit={habit}
    dates={dates}
    completions={completionMap[habit._id] ?? {}}
    onToggle={onToggle}
  />
))}

      </div>
    </div>
  );
}
