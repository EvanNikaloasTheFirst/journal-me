"use client";
import { useEffect, useState } from "react";
import JournalPane from "./JournalPane";
import JournalList from "./JournalList";
import JournalViewer from "./JournalViewer";
import { createJournal } from "@/lib/journals/journal";
import { Journal } from "../Models/Journal";
import { fetchJournals, deleteJournal } from "@/lib/journals/journal";
import { updateJournalDate } from "@/lib/journals/journal";


export default function JournalSection() {
  const [entries, setEntries] = useState<Journal[]>([]);
const [openEntry, setOpenEntry] = useState<Journal | null>(null);

useEffect(() => {
  async function load() {
    try {
      const data = await fetchJournals();
      setEntries(data);
    } catch (err) {
      console.error("Failed to load journals", err);
    }
  }

  load();
}, []);

async function updateEntryDate(id: string, date: string) {
  const iso = new Date(date).toISOString();

  // ✅ optimistic list update
  setEntries((prev) =>
    prev.map((e) =>
      e._id === id ? { ...e, createdAt: iso } : e
    )
  );

  // ✅ optimistic open modal update
  setOpenEntry((prev) =>
    prev && prev._id === id
      ? { ...prev, createdAt: iso }
      : prev
  );

  try {
    await updateJournalDate(id, date);
  } catch (err) {
    console.error("Failed to update journal date", err);
  }
}



function handleOpen(entry: Journal) {
  setOpenEntry(prev =>
    prev?._id === entry._id ? null : entry
  );
}


async function saveEntry(title: string, text: string) {
  // Create optimistic entry
  const tempId = crypto.randomUUID();

  const optimisticEntry: Journal = {
    _id: tempId,
    title,
    text,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // ⬆️ ADD TO LIST immediately
  setEntries((prev) => [optimisticEntry, ...prev]);

  try {
    const saved = await createJournal(title, text);

    // 🔁 Replace optimistic entry with real one from DB
    setEntries((prev) =>
      prev.map((e) => (e._id === tempId ? saved : e))
    );
  } catch (err) {
    console.error("Could not save journal entry", err);

    // ❌ Rollback optimistic entry
    setEntries((prev) => prev.filter((e) => e._id !== tempId));
  }
}


async function deleteEntry(id: string) {
  const confirmed = window.confirm(
    "⚠️ This will permanently delete this journal entry.\n\nThis action cannot be undone.\n\nDo you want to continue?"
  );

  if (!confirmed) return;
  

  // Optimistic UI update
  setEntries((prev) => prev.filter((e) => e._id !== id));

  try {
    await deleteJournal(id);
    setOpenEntry(null)
  } catch (error) {
    console.error("Failed to delete journal entry:", error);
  }
}


  return (
    <div className=" rounded-md p-4 border border-black/30
          rounded-md
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]">

        {/* WRITE */}
        <JournalPane onSave={saveEntry} />

        {/* READ */}
        <JournalList
        
          entries={entries}
          onDelete={deleteEntry}
          onOpen={handleOpen}
        />


{openEntry && (
  <JournalViewer
    entry={openEntry}
    onClose={() => setOpenEntry(null)}
    onUpdateDate={updateEntryDate}
  />
)}





    </div>
  );
}
