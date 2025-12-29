type HabitUpdateResponse = {
  id: string;
  archived: boolean;
};


export async function createHabit(name: string, archived:boolean) {
  const res = await fetch("/api/habits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, archived }),
  });

  const data = await res.json();

  console.log("📨 API RESPONSE (createHabit):", data);

  if (!res.ok) throw new Error(data.error || "Failed to create habit");

  return data;
}

export async function fetchHabits() {
  const res = await fetch("/api/habits", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log("📨 API RESPONSE (fetchHabits):", data);

  if (!res.ok) throw new Error(data.error || "Failed to fetch habits");

  return data;
}


export async function updateHabit(
  id: string,
  name: string,
  archived: boolean
) {
  const res = await fetch("/api/habits", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      name,
      archived,
    }),
  });

  const data = await res.json();

  console.log("✏️ API RESPONSE (updateHabit):", data);

  if (!res.ok) {
    throw new Error(data.error || "Failed to update habit");
  }

  return data;
}


export async function deleteHabit(id: string) {
  const res = await fetch("/api/habits", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  console.log("🗑️ DELETE RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data.error || "Failed to delete habit");
  }

  return data;
}

export async function toggleHabitArchived(
  id: string,
  archived: boolean
): Promise<HabitUpdateResponse> {
  const res = await fetch("/api/habits", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, archived }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to update habit");
  }

  return data as HabitUpdateResponse;
}
