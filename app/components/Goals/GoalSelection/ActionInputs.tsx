"use client";

type Props = {
  actions: string[];
  onChange: (actions: string[]) => void;
};

export default function ActionInputs({ actions, onChange }: Props) {
  function addAction() {
    if (actions.length >= 2) return;
    onChange([...actions, ""]);
  }

  function updateAction(index: number, value: string) {
    onChange(actions.map((a, i) => (i === index ? value : a)));
  }

  function removeAction(index: number) {
    onChange(actions.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2 border border-black/30 rounded-sm p-3">
      <p className="font-handwriting text-[13px] opacity-70">
        Key actions (max 2)
      </p>

      {actions.map((action, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={action}
            onChange={(e) => updateAction(i, e.target.value)}
            placeholder={`Action ${i + 1}`}
            className="flex-1 border border-black/40 rounded-sm px-2 py-1 text-[12px]"
          />

          <button
            onClick={() => removeAction(i)}
            className="text-[10px] opacity-60 hover:text-red-600"
          >
            remove
          </button>
        </div>
      ))}

      {actions.length < 2 && (
        <button
          onClick={addAction}
          className="font-handwriting text-[11px] underline opacity-70"
        >
          + add action
        </button>
      )}
    </div>
  );
}
