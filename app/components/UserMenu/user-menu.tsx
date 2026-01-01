"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { DeleteAccountButton } from "../Buttons/DeleteAccount";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="
          px-3 py-2
          bg-blue-200
          font-handwriting
          text-[11px]
          border border-black/40
          rounded-sm
          shadow-sm
        "
      >
        Account
      </button>

      {/* MENU */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-40
            bg-[#fffdf5]
            border border-black/30
            rounded-md
            shadow-[3px_4px_0px_rgba(0,0,0,0.15)]
            text-[11px]
            z-50
          "
        >
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="
              w-full text-left px-3 py-2
              hover:bg-black/5
            "
          >
            Log out
          </button>

          <div className="border-t border-black/10" />

          <button
            onClick={() => {
              setOpen(false);
              document
                .getElementById("delete-account-btn")
                ?.click();
            }}
            className="
              w-full text-left px-3 py-2
              text-red-600
              hover:bg-red-50
            "
          >
            Delete account
          </button>
        </div>
      )}

      {/* Hidden delete button */}
      <div className="hidden">
        <DeleteAccountButton id="delete-account-btn" />
      </div>
    </div>
  );
}
