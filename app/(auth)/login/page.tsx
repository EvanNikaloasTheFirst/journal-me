"use client";

import GoogleSignInButton from "@/app/components/Buttons/GoogleSignIn";
import { useState, useEffect } from "react";
export default function LoginPage() {

  

  return (
<div className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors">
      <div className="flex flex-col items-center gap-4">

        <div>
          <h1 className="font-handwriting text-[32px] tracking-[0.25em] text-black dark:text-white text-center">
            Life's Operating System
          </h1>

          <p className="text-black dark:text-white text-center">
            Designed to help you track every bit of progress in your life.
          </p>
        </div>

        {/* Notebook wrapper */}
        <div className="relative perspective-[1200px]">
          {/* Desk shadow */}
          <div className="absolute inset-0 translate-x-4 translate-y-5 bg-black/60 blur-2xl rounded-lg -z-10" />

          {/* Notebook */}
          <div
            className="
              relative
              w-[340px]
              min-h-[420px]
              rounded-lg
              bg-gradient-to-br from-[#111] to-[#1a1a1a]
              border border-white/10
              shadow-[8px_10px_0px_rgba(0,0,0,0.6)]
              overflow-hidden
            "
          >
            {/* Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black to-[#1b1b1b] border-r border-white/10" />

            {/* Page edge */}
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-[#d6d2c8] to-[#bfb9ad]" />

            {/* Top highlight */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white/10 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-between px-8 py-10 text-white font-handwriting">
<h1 className="text-center font-handwriting text-[32px] tracking-[0.25em]">
  LifeOS
</h1>
       
              {/* Description */}
              <div className="text-[12px] opacity-80 space-y-1 text-center mt-10">
                <p>habits</p>
                <p>goals</p>
                <p>reflection</p>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-dashed border-white/20 my-4" />

              {/* Login */}
              <div className="w-full space-y-3">
                <GoogleSignInButton />
                <p className="text-[10px] opacity-50 text-center italic">
                  Nothing fancy. Just progress.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div>

      </div>
    </div>
  );
}
