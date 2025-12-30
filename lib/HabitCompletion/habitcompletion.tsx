import { HabitCompletion } from "@/app/components/Models/HabitCompletion";
import { HabitCompletionUpdateResponse } from "@/app/components/Models/HabitCompletionUpdateResponse";


export async function fetchHabitCompletions(
  habitIds: string[],
  userEmail: string,
  customDate?: string
) {
  if (!habitIds.length || !userEmail) return [];

  // ✅ single source of truth
  const date = customDate ?? getLocalDateString(); // YYYY-MM-DD (local)

  const params = new URLSearchParams({
    habitIds: habitIds.join(","),
    date,          // ✅ matches GET handler
    userEmail,
  });

  const res = await fetch(`/api/habitcompletions?${params}`);

  if (!res.ok) return [];

  return res.json();
}



function getLocalDateString() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split("T")[0];
}


export async function toggleHabitCompletion(
  habitId: string,
  date: string,
  completed: boolean,
  userEmail: string
): Promise<HabitCompletionUpdateResponse> {
  const res = await fetch("/api/habitcompletions", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      habitId,
      date,
      completed,
      userEmail,
    }),
  });

  const data = await res.json();
console.log(data)
  if (!res.ok) {
    throw new Error(data.error || "Failed to toggle habit completion");
  }

  return data;
}

