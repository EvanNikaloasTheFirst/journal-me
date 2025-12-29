
export default function HabitDaysHeader() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="contents">
      <div className="h-10 border-r border-black" />

      {days.map((day) => (
        <div
          key={day}
          className="h-10 border border-black/70 flex items-center justify-center text-xs"
        >
          {day}
        </div>
      ))}
    </div>
  );
}
