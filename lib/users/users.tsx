export async function deleteAccount(): Promise<void> {
  const res = await fetch("/api/admin", {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete account");
  }
}
