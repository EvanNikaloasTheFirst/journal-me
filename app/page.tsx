"use client";

import GoogleSignInButton from "./components/Buttons/GoogleSignIn";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
      {/* Notebook */}
      <div
        className="
          relative
          w-[340px]
          min-h-[440px]
          bg-[#fffdf9]
          border border-black/30
          rounded-md
          px-6
          py-8
          shadow-[3px_4px_0px_rgba(0,0,0,0.15)]
          overflow-hidden
        "
      >
        {/* Notebook margin line */}
        <div className="absolute left-4 top-0 bottom-0 border-l border-red-400/40" />

        {/* Binder holes */}
        <div className="absolute left-2 top-10 flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full border border-black/30 bg-[#faf8f5]"
            />
          ))}
        </div>

        {/* Content */}
        <div className="space-y-7 pl-6 font-handwriting">
          <div className="space-y-1">
            <h1 className="text-[22px] tracking-wide">
              Welcome back
            </h1>
            <p className="text-[11px] opacity-60">
              Pick up where you left off.
            </p>
          </div>

          <div className="space-y-2 text-[12px]">
            <p className="opacity-70">
              This notebook helps you:
            </p>
            <ul className="space-y-1 leading-relaxed">
              <li>• track habits daily</li>
              <li>• move goals forward</li>
              <li>• stay consistent</li>
            </ul>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-black/30 pt-5" />

          {/* Login */}
          <div className="space-y-3">
            <GoogleSignInButton />

            <p className="text-[10px] opacity-50 text-center">
              Nothing fancy. Just progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
