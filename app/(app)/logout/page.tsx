"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <div className="flex items-center justify-center py-20">
      <p className="font-handwriting text-[12px] text-neutral-600">
        Logging you out…
      </p>
    </div>
  );
}
