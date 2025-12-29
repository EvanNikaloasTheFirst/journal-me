"use client";
import { useRouter, usePathname } from "next/navigation";

type BookmarkProps = {
  label: string;
  path: string;
  color?: string;
};

export default function Bookmark({
  label,
  path,
  color = "bg-yellow-300",
}: BookmarkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const fullPath = path === "" ? "/" : `/${path}`;
  const active = pathname === fullPath;

  return (
    <button
      onClick={() => router.push(fullPath)}
      className={`
        relative
        px-3 py-2
        ${color}
        font-handwriting
        text-[11px]
        border border-black/40
        rounded-b-sm
        shadow-sm
        transition
        hover:-translate-y-[1px]

        ${
          active
            ? "z-20 translate-y-0 ring-2 ring-black/40"
            : "z-0 translate-y-[6px]"
        }
      `}
    >
      {label}
    </button>
  );
}
