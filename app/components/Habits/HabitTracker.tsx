import { Habit } from "../Models/Habit";
import { CompletionMap } from "../Models/CompletionMap";
import HabitRow from "./HabitRow";
import HabitDaysHeader from "./HabitDaysHeader";

type Props = {
  habits: Habit[];
  completionMap: CompletionMap;
  dates: string[];
  onToggle: (habitId: string, date: string) => void;
};

export default function HabitTracker({
  habits,
  completionMap,
  onToggle,
  dates
}: Props) {
  if (!habits || habits.length === 0) {
    return (
      <div className="p-6 text-[12px] opacity-60">
        <a href="/habits">Let's set up some goals</a>
      </div>
    );
  }

  return (
    <div className="w-full p-3">
      <div className="grid relative right-[10px] grid-cols-[100px_repeat(7,1fr)] gap-0">
        <HabitDaysHeader />

       {habits.map((habit
       ) => (
  <HabitRow
    key={habit._id}
    habit={habit}
    dates={dates} // ✅ ADD THIS
    completions={completionMap[habit._id] ?? {}}
    onToggle={onToggle}
  />
))}

      </div>
    </div>
  );
}
