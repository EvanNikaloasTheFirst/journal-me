import { Journal } from "@/app/components/Models/Journal";
/* ================= CREATE ================= */
export async function createJournal(
  title: string,
  text: string
): Promise<Journal> {
  const res = await fetch("/api/journals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, text }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to create journal");
  }

  return data;
}

/* ================= READ ================= */
export async function fetchJournals(): Promise<Journal[]> {
  const res = await fetch("/api/journals");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch journals");
  }

  return data;
}

/* ================= UPDATE ================= */
export async function updateJournal(
  id: string,
  updates: { title?: string; text?: string }
) {
  const res = await fetch("/api/journals", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update journal");
  }

  return data;
}

/* ================= DELETE ================= */
export async function deleteJournal(id: string) {
  const res = await fetch("/api/journals", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete journal");
  }

  return data;
}


export async function updateJournalDate(
  id: string,
  date: string
) {
  const res = await fetch("/api/journals", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      createdAt: date,
    }),
  });

  
  if (!res.ok) {
    throw new Error("Failed to update journal date");
  }

  return res.json();
}
