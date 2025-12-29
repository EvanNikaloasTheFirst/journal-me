import { YearlyGoal } from "@/app/components/Models/YearlyGoals";

/* ================= CREATE ================= */
export async function createYearlyGoal(
  goal: string,
  year: string
) {
    
  const res = await fetch("/api/yearly-goals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal, year }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create yearly goal");
  }

  return data;
}

/* ================= READ ================= */
export async function fetchYearlyGoals(
  year?: string
): Promise<YearlyGoal[]> {
  const url = year
    ? `/api/yearly-goals?year=${year}`
    : "/api/yearly-goals";

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch yearly goals");
  }

  return data;
}

/* ================= UPDATE ================= */
// lib/yearlyGoals/api.ts
export async function updateYearlyGoal(
  id: string,
  completed?: boolean
  
) {
  const res = await fetch("/api/yearly-goals", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, completed }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update yearly goal");
  }

  return data;
}


/* ================= DELETE ================= */
export async function deleteYearlyGoal(id: string): Promise<void> {
  const res = await fetch("/api/yearly-goals", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete yearly goal");
  }
}
