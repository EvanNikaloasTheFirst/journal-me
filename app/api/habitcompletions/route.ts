import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";

/* ================= POST (FETCH COMPLETIONS) ================= */
export async function POST(req: Request) {
  try {
    const { habitIds, dates } = await req.json();

    if (!habitIds?.length || !dates?.length) {
      return Response.json([]);
    }

    const completions = await getCollection("habit_completions");

    const docs = await completions
      .find({
        habitId: { $in: habitIds.map((id: string) => new ObjectId(id)) },
        date: { $in: dates },
      })
      .toArray();

    return Response.json(docs);
  } catch (err) {
    console.error("POST habitcompletions error:", err);
    return Response.json(
      { error: "Failed to fetch completions" },
      { status: 500 }
    );
  }
}

/* ================= PATCH (TOGGLE COMPLETION) ================= */
export async function PATCH(req: Request) {
  try {
    const { habitId, date, completed } = await req.json();

    if (!habitId || !date || typeof completed !== "boolean") {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const completions = await getCollection("habit_completions");

    await completions.updateOne(
      {
        habitId: new ObjectId(habitId),
        date,
      },
      {
        $set: {
          completed,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          habitId: new ObjectId(habitId),
          date,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return Response.json({
      habitId,
      date,
      completed,
    });
  } catch (err) {
    console.error("PATCH habitcompletions error:", err);
    return Response.json(
      { error: "Failed to toggle completion" },
      { status: 500 }
    );
  }
}
