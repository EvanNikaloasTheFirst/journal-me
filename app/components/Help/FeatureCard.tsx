"use client";

type FeatureCardProps = {
  title: string;
  imageUrl?: string;
  points?:string[]
  onOpen: (data: { title: string; imageUrl?: string, points?: string[]}) => void;
};


export function FeatureCard({ title, imageUrl, points, onOpen }: FeatureCardProps) {
  return (
    <div
     onClick={() => onOpen({ title, imageUrl })}
      className="
        group
        absolute
        flex
        items-center
        justify-center
        w-4
        h-4
        rounded-sm
        p-2
        border border-black/40
        bg-[#fffdf9]
        shadow-[1px_2px_0px_rgba(0,0,0,0.2)]
        cursor-pointer
        hover:scale-110
        transition
      "
    >
      {/* Dot */}
      <span className="text-[10px] leading-none">?</span>

      {/* Hover label */}
      <div
        className="
          pointer-events-none
          absolute
          top-1/2
          left-full
          ml-2
          -translate-y-1/2
          whitespace-nowrap
          rounded-sm
          border border-black/30
          bg-[#fffdf9]
          px-2
          py-1
          text-[10px]
          font-handwriting
          opacity-0
          translate-x-1
          group-hover:opacity-100
          group-hover:translate-x-0
          transition
          shadow-[2px_3px_0px_rgba(0,0,0,0.15)]
        "
      >
        {title}
        
      </div>
    </div>
  );
}
