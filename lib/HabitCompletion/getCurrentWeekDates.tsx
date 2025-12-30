export function getCurrentWeekDates(): string[] {
  const today = new Date();

  // JS: Sunday = 0, Monday = 1 ...
  const day = today.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const dates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    dates.push(d.toISOString().split("T")[0]);
  }

  return dates;
}

export function getWeekDates(weekOffset = 0) {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sun) → 6 (Sat)

  // Move to Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((currentDay + 6) % 7) + weekOffset * 7);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toLocaleDateString("en-CA"); // YYYY-MM-DD
  });
}
