import { ToDo } from "@/app/components/Models/todo";
/* ================= CREATE ================= */
export async function createTodo(text: string): Promise<ToDo> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create todo");

  return data;
}

/* ================= READ ================= */
export async function fetchTodos(): Promise<ToDo[]> {
  const res = await fetch("/api/todos");

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch todos");

  return data;
}

/* ================= READ ALL ================= */
export async function fetchAllTodos(): Promise<ToDo[]> {
  const res = await fetch("/api/todos?all=true");

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch all todos");

  return data;
}

/* ================= UPDATE ================= */
export async function updateTodo(
  id: string,
  updates: Partial<Pick<ToDo, "completed" | "locked" | "text">>
): Promise<ToDo> {
  const res = await fetch("/api/todos", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update todo");

  return data;
}

/* ================= DELETE ================= */
export async function deleteTodo(id: any): Promise<void> {
  const res = await fetch("/api/todos", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete todo");
}
