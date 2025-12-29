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
          min-h-[420px]
          bg-[#fffdf9]
          border border-black/30
          rounded-md
          px-6
          py-8
          shadow-[2px_3px_0px_rgba(0,0,0,0.15)]
        "
      >


        {/* Content */}
        <div className="space-y-6 pl-4">
          <h1 className="font-handwriting text-[22px]">
            Welcome back
          </h1>

          <div className="space-y-2">
            <p className="text-[12px] opacity-70">
              This is your space to:
            </p>
            <ul className="text-[12px] space-y-1">
              <li>• track habits</li>
              <li>• move goals forward</li>
              <li>• stay consistent</li>
            </ul>
          </div>

          {/* Divider line */}
          <div className="border-t border-dashed border-black/30 pt-4" />

          {/* Login button */}
         <GoogleSignInButton/>

          <p className="text-[10px] opacity-50 text-center">
            Nothing fancy. Just progress.
          </p>
        </div>
      </div>
    </div>
  );
}
