"use client";

import { signOut } from "next-auth/react";
import { deleteAccount } from "@/lib/users/users";

export function DeleteAccountButton({ id }: { id?: string }) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "⚠️ This will permanently delete your account and all associated data.\n\nThis action cannot be undone.\n\nDo you want to continue?"
    );

    if (!confirmed) return;

    try {
      await deleteAccount();
      await signOut({ callbackUrl: "/" });
    } catch {
      alert("Failed to delete account.");
    }
  }

  return (
    <button id={id} onClick={handleDelete}>
      Delete
    </button>
  );
}
