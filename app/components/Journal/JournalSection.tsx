"use client";
import { useEffect, useState } from "react";
import JournalPane from "./JournalPane";
import JournalList from "./JournalList";
import JournalViewer from "./JournalViewer";
import { createJournal } from "@/lib/journals/journal";
import { Journal } from "../Models/Journal";
import { fetchJournals, deleteJournal } from "@/lib/journals/journal";




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


function handleOpen(entry: Journal) {
  setOpenEntry(prev =>
    prev?._id === entry._id ? null : entry
  );
}


async function saveEntry(title: string, text: string) {
  // optimistic entry
 


  try {
    const saved = await createJournal(title, text);

    
  } catch (err) {
    // rollback if DB fails
    console.log("Err could not save journal sorry.")
  }
}


  async function deleteEntry(id: string) {
  // Optimistic UI update
  setEntries((prev) => prev.filter((e) => e._id !== id));

  try {
    await deleteJournal(id);
  } catch (error) {
    console.error("Failed to delete journal entry:", error);
    // Optional: rollback or show toast
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
    />
  )}





    </div>
  );
}
