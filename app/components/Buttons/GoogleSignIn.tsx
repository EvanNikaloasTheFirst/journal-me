"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
<button
  type="button" // avoids accidental form submit
  onClick={() =>
    signIn("google", {
      callbackUrl: "/dashboard",
    })
  }
  className="
    w-full
    flex
    items-center
    justify-center
    gap-2
    font-handwriting
    text-[13px]
    border border-white/40
    rounded-sm
    px-3 py-2
    bg-white/90
    hover:bg-green-200/40
    transition
    text-black
  "
>

      <span >Sign in with</span>
      <img
        src="/google.png"
        alt="Sign in with Google"
        className="w-[70px]"
      />
    </button>
  );
}
