import { HabitCompletion } from "@/app/components/Models/HabitCompletion";
import { CompletionMap } from "@/app/components/Models/CompletionMap";
export function buildCompletionMap(
  completions: HabitCompletion[]
): CompletionMap {
  const map: CompletionMap = {};

  for (const c of completions) {
    if (!map[c.habitId]) {
      map[c.habitId] = {};
    }

    map[c.habitId][c.date] = c.completed;
  }

  return map;
}
