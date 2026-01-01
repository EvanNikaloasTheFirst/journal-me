import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email;

  try {
    // Collections owned by the user
    const collections = [
      "users",
      "journals",
      "moments",
      "habits",
      "habitcompletions",
      "yearlygoals",
    ];

    for (const name of collections) {
      const collection = await getCollection(name);

      // users collection uses email as unique identifier
      if (name === "users") {
        await collection.deleteOne({ email });
      } else {
        await collection.deleteMany({ userId: email });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Account deletion failed:", err);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
