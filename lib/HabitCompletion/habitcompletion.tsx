import { HabitCompletion } from "@/app/components/Models/HabitCompletion";
import { HabitCompletionUpdateResponse } from "@/app/components/Models/HabitCompletionUpdateResponse";
export async function fetchHabitCompletions(
  habitIds: string[],
  dates: string[]
): Promise<HabitCompletion[]> {
  const res = await fetch("/api/habitcompletions", {
    method: "POST", // POST because arrays
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ habitIds, dates }),
  });

  const data = await res.json();

  console.log("📨 API RESPONSE (fetchHabitCompletions):", data);

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch habit completions");
  }

  return data;
}


export async function toggleHabitCompletion(
  habitId: string,
  date: string,
  completed: boolean
): Promise<HabitCompletionUpdateResponse> {
  const res = await fetch("/api/habitcompletions", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      habitId,
      date,
      completed,
    }),
  });

  const data = await res.json();

  console.log("✅ TOGGLE COMPLETION RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data.error || "Failed to toggle habit completion");
  }

  return data as HabitCompletionUpdateResponse;
}
