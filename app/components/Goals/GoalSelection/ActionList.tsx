export default function ActionList({
  actions,
}: {
  actions: { text: string; frequency: string }[];
}) {
  return (
    <div className="border border-black/30 rounded-sm p-3 space-y-2">
      <h3 className="font-handwriting text-[13px]">
        Focus Actions
      </h3>

      {actions.map((a, i) => (
        <div
          key={i}
          className="flex justify-between text-[12px]"
        >
          <span>• {a.text}</span>
          <span className="opacity-60">{a.frequency}</span>
        </div>
      ))}
    </div>
  );
}
