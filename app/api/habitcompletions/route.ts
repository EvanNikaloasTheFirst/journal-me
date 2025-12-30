import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db";
import { getWeekRange } from "@/lib/dates/date";
/* ================= POST (FETCH COMPLETIONS) ================= */
export async function POST(req: Request) {
  try {
    const { habitIds, dates, userEmail } = await req.json();

    if (!habitIds?.length || !dates?.length || !userEmail) {
      return Response.json([]);
    }

    const completions = await getCollection("habit_completions");

    const docs = await completions
      .find({
        userEmail,
        habitId: {
          $in: habitIds
            .filter(ObjectId.isValid)
            .map((id: string) => new ObjectId(id)),
        },
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
    const { habitId, date, completed, userEmail } = await req.json();

    if (!habitId || !date || typeof completed !== "boolean" || !userEmail) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const completions = await getCollection("habit_completions");

    await completions.updateOne(
      {
        userEmail,                      // ✅ match by email
        habitId: new ObjectId(habitId),
        date,                           // ✅ match current date
      },
      {
        $set: {
          completed,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          userEmail,                    // ✅ store email
          habitId: new ObjectId(habitId),
          date,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return Response.json({ habitId, date, completed });
  } catch (err) {
    console.error("PATCH habitcompletions error:", err);
    return Response.json(
      { error: "Failed to toggle completion" },
      { status: 500 }
    );
  }
}





export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get("date");
    const weekStart = searchParams.get("weekStart"); // 👈 NEW
    const habitIdsParam = searchParams.get("habitIds");
    const userEmail = searchParams.get("userEmail");

    if (!date || !habitIdsParam || !userEmail) {
      return Response.json([]);
    }

    const habitIds = habitIdsParam
      .split(",")
      .filter(ObjectId.isValid)
      .map((id) => new ObjectId(id));

    if (!habitIds.length) return Response.json([]);

    const { start, end } = getWeekRange(date, weekStart ?? undefined);

    const completions = await getCollection("habit_completions");

    const docs = await completions.find({
      userEmail,
      habitId: { $in: habitIds },
      date: { $gte: start, $lte: end },
    }).toArray();

    return Response.json(docs);
  } catch (err) {
    console.error("GET habitcompletions error:", err);
    return Response.json([]);
  }
}

// Delete