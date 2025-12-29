"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard",
        })
      }
      className="
        w-full
        font-handwriting
        text-[13px]
        border border-black/40
        rounded-sm
        px-3 py-2
        bg-transparent
        hover:bg-green-200/40
        transition
      "
    >
      Sign in with Google
    </button>
  );
}
