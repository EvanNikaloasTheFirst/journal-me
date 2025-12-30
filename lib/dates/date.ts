export function getLocalDateString(date = new Date()) {
  return date.toLocaleDateString("en-CA"); // YYYY-MM-DD
}



export function isFuture(dateStr: string) {
  return dateStr > getLocalDateString();
}
export function getWeekRange(
  date: string,
  weekStart?: string
) {
  if (weekStart) {
    const start = new Date(weekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    };
  }

  // fallback: infer week from date (Monday start)
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;

  const start = new Date(d);
  start.setDate(d.getDate() + diff);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}


export function getCurrentWeekStart(): string {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // Monday start

  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);

  return monday.toISOString().slice(0, 10); // YYYY-MM-DD
}
