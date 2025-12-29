export default function MomentItem({
  index,
  text,
  onDelete,
}: {
  index: number;
  text: string;
  onDelete: () => void;
}) {
  return (
    <li className="flex items-start gap-2 leading-relaxed group">
      <span className="shrink-0">{index})</span>

      <span className="flex-1">{text}</span>

      <button
        onClick={onDelete}
      className="p-1 text-[10px] bg-red-500 text-white rounded-sm"
                 title="Delete moment"
            >
              Delete
      </button>

    </li>
  );
}
