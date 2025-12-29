"use client";

import { useEffect, useState } from "react";
import {
  createTodo,
  fetchTodos,
  updateTodo,
  deleteTodo,
} from "@/lib/todos/todo";
import { useSession } from "next-auth/react";
import { ToDo } from "../Models/todo";

const DATE_KEY = "todos-date";

function todayKey() {
  return new Date().toDateString();
}

export default function TodoBox() {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();


  /* ================= LOAD + DAILY RESET ================= */
  useEffect(() => {
    async function load() {
      const data = await fetchTodos();

      const storedDate = localStorage.getItem(DATE_KEY);
      const today = todayKey();

      const hasLocked = data.some((t) => t.locked);

      // new day & nothing locked → wipe DB todos
      if (storedDate !== today && !hasLocked) {
        await Promise.all(data.map((t) => deleteTodo(t._id)));
        setTodos([]);
      } else {
        setTodos(data);
      }

      localStorage.setItem(DATE_KEY, today);
      setLoading(false);
    }

    load();
  }, []);

  /* ================= ACTIONS ================= */
  async function addTodo() {
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

    // optimistic
  const optimistic: ToDo = {
  _id: crypto.randomUUID(),
  userId: session?.user?.email ?? "",
  text: text,
  completed: false,
  locked: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};


    setTodos((prev) => [optimistic, ...prev]);

    try {
      const saved = await createTodo(text);
      setTodos((prev) =>
        prev.map((t) => (t._id === optimistic._id ? saved : t))
      );
    } catch {
      setTodos((prev) => prev.filter((t) => t._id !== optimistic._id));
    }
  }

  async function toggleTodo(todo: ToDo) {
    const next = !todo.completed;

    setTodos((prev) =>
      prev.map((t) =>
        t._id === todo._id ? { ...t, completed: next } : t
      )
    );

    await updateTodo(todo._id, { completed: next });
  }

  async function toggleLock(todo: ToDo) {
    const next = !todo.locked;

    setTodos((prev) =>
      prev.map((t) =>
        t._id === todo._id ? { ...t, locked: next } : t
      )
    );

    await updateTodo(todo._id, { locked: next });
  }

  async function removeTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    await deleteTodo(id);
  }

  /* ================= UI ================= */
  if (loading) {
    return <p className="text-[11px] opacity-50">Loading…</p>;
  }

  return (
    <div className="p-3">
      <h2 className="text-[22px]">To-Do List</h2>

      {/* Input */}
      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task…"
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="
            font-handwriting text-[11px]
            tracking-wide rounded-sm px-3 py-1
            border border-black/40
          "
        />

        <button
          onClick={addTodo}
          className="px-2 py-1 text-[11px] border border-black/40"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-start gap-2 text-[12px]"
          >
            {/* Complete */}
            <button
              onClick={() => toggleTodo(todo)}
              className="w-4 h-4 border border-black/60 mt-[2px]"
            >
              {todo.completed && "✕"}
            </button>

            {/* Text */}
            <span
              className={`
                flex-1 font-handwriting
                ${todo.completed ? "line-through opacity-50" : ""}
              `}
            >
              {todo.text}
            </span>

            {/* Lock */}
            <button
              onClick={() => toggleLock(todo)}
              title="Lock task"
              className="text-[11px]"
            >
              {todo.locked ? "🔒" : "🔓"}
            </button>

            {/* Delete */}
            <button
              onClick={() => removeTodo(todo._id)}
className="p-1 text-[10px] bg-red-500 text-white rounded-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-[10px] opacity-50 italic">
          New day, clean slate ✨
        </p>
      )}
    </div>
  );
}
