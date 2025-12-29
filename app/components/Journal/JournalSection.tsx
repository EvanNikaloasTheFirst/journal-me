"use client";
import { useEffect, useState } from "react";
import JournalPane from "./JournalPane";
import JournalList from "./JournalList";
import JournalViewer from "./JournalViewer";
import { createJournal } from "@/lib/journals/journal";
import { Journal } from "../Models/Journal";




export default function JournalSection() {
  const [entries, setEntries] = useState<Journal[]>([]);
const [openEntry, setOpenEntry] = useState<Journal | null>(null);



function handleOpen(entry: Journal) {
  setOpenEntry(prev =>
    prev?._id === entry._id ? null : entry
  );
}

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("journals");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(entries));
  }, [entries]);

async function saveEntry(title: string, text: string) {
  // optimistic entry
 


  try {
    const saved = await createJournal(title, text);

    
  } catch (err) {
    // rollback if DB fails
    console.log("Err could not save journal sorry.")
  }
}


  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e._id !== id));
  }

  return (
    <div className="border border-black/40 rounded-md p-4 border border-black/30
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
