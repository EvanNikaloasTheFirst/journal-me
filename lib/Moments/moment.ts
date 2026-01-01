import { Moment } from "@/app/components/Models/Moment";

/* ================= CREATE ================= */
export async function createMoment(text: string): Promise<Moment> {
  const res = await fetch("/api/moments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create moment");

  return data;
}

/* ================= READ ================= */
export async function fetchMoments(): Promise<Moment[]> {
  const res = await fetch("/api/moments");

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch moments");

  return data;
}

/* ================= UPDATE ================= */
export async function updateMoment(
  id: string,
  text: string
): Promise<Moment> {
  const res = await fetch("/api/moments", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, text }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update moment");

  return data;
}

/* ================= DELETE ================= */
export async function deleteMoment(id: string): Promise<void> {
  const res = await fetch("/api/moments", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete moment");
}

/* ================= STATS ================= */
export async function fetchMomentStats(): Promise<{
  thisMonth: number;
  lastMonth: number;
  streak: number;
}> {
  const res = await fetch("/api/moments/stats");

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch stats");

  return data;
}





export function groupMomentsByYearMonth(moments: Moment[]) {
  return moments.reduce((acc, moment) => {
    if (!acc[moment.year]) acc[moment.year] = {};
    if (!acc[moment.year][moment.month]) acc[moment.year][moment.month] = [];

    acc[moment.year][moment.month].push(moment);
    return acc;
  }, {} as Record<number, Record<number, Moment[]>>);
}
