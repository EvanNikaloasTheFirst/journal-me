export default function JournalEditor({
  date,
  entry,
  onSave,
}: {
  date: string;
  entry?: string;
  onSave: (text: string) => void;
}) {
  return (
    <div>
      <p className="font-handwriting text-[12px] mb-1">
        {date}
      </p>

      <textarea
        defaultValue={entry || ""}
        maxLength={1000}
        placeholder="Write honestly. No pressure."
        className="
          w-full
          h-40
          border border-black/40
          rounded-sm
          p-2
          font-handwriting
          text-[12px]
          resize-none
        "
        onBlur={(e) => onSave(e.target.value)}
      />

    </div>
  );
}
