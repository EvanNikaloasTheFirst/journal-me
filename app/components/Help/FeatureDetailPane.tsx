"use client";
import Image from "next/image";
import { useState } from "react";
type FeatureDetailPaneProps = {
  title: string;
  description: string;
  bullets?: string[];
  points?: string[];
  imageUrl?: string;
  onClose: () => void;
};
export function FeatureDetailPane({
  title,
  description,
  bullets,
  points,
  imageUrl,
  onClose,
}: FeatureDetailPaneProps) {

  const [zoomed, setZoomed] = useState(false);


  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
      "
      onClick={onClose}
    >
      {/* Modal card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          bg-[#fffdf9]
          border border-black/30
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
          rounded-lg
          p-6
          font-handwriting
          animate-in fade-in zoom-in-95
        "
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-[18px]">{title}</h2>

          <button
            onClick={onClose}
            className="text-[12px] underline opacity-60 hover:opacity-100"
          >
            close
          </button>
        </div>

        {/* Content */}
        <p className="text-[12px] opacity-80 leading-relaxed">
          {description}
        </p>
        {points && (
  <ul className="mt-4 space-y-2 text-[12px] leading-relaxed">
    {points.map((p, i) => (
      <li key={i} className="flex gap-2">
        <span>•</span>
        <span>{p}</span>
      </li>
    ))}
  </ul>
)}

        {bullets && (
          <ul className="mt-4 space-y-2 text-[12px]">
            {bullets.map((b, i) => (
              <li key={i}>• {b}</li>
            ))}
          </ul>
        )}
{imageUrl && (
  <Image
    src={imageUrl}
    alt={title}
    width={400}
    height={240}
    onClick={() => setZoomed(true)}
    className="
      mt-4
      rounded-md
      border border-black/20
      object-contain
      cursor-zoom-in
      transition
      hover:scale-[1.50]
    "
  />
)}


        <div>

        </div>
      </div>
    </div>
  );
}
