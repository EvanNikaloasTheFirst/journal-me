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
