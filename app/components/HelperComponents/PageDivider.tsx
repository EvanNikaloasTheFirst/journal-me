export default function PageDivider({
  label,
}: {
  label?: string;
}) {
  return (
    <div className="relative my-6">
      {/* line */}
      <div className="border-t border-black/30" />

      {/* label */}
      {label && (
        <span
          className="
            absolute
            left-4
            -top-2
            bg-[#f6f1e7]
            px-2
            font-handwriting
            text-[11px]
            opacity-70
          "
        >
          {label}
        </span>
      )}
    </div>
  );
}
