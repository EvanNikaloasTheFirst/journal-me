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
        bg-black
        text-white
      "
    >
      {/* Dot */}
      <span className="text-[10px] leading-none">Help</span>

      {/* Hover label */}
     
    </div>
  );
}
