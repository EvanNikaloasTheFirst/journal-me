import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

/**
 * POST – create habit
 */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.email;
  const { name,archived } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "Habit name required" },
      { status: 400 }
    );
  }

  const habits = await getCollection("habits");

  const habit = {
    userId,
    name,
    archived,
    createdAt: new Date(),
  };

  const result = await habits.insertOne(habit);

  console.log("🧠 Mongo insert result:", result.insertedId);
  console.log("📦 Stored habit:", habit);

  return NextResponse.json(
    {
      id: result.insertedId.toString(),
      ...habit,
    },
    { status: 201 }
  );
}

/**
 * GET – fetch habits for logged-in user
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.email;
  const habits = await getCollection("habits");

  const data = await habits
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  console.log("📦 FETCHED HABITS:", data);

  return NextResponse.json(data);
}


/**
 * PUT – update habit name & actions
 */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.email;
  const { id, name } = await req.json();

  if (!id || !name) {
    return NextResponse.json(
      { error: "Habit id and name required" },
      { status: 400 }
    );
  }

  const habits = await getCollection("habits");

  const result = await habits.updateOne(
    { _id: new ObjectId(id), userId },
    {
      $set: {
        name,
        updatedAt: new Date(),
      },
    }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json(
      { error: "Habit not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id,
    name,

  });
}


export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Valid habit id required" },
      { status: 400 }
    );
  }

  const habitId = new ObjectId(id);
  const userEmail = session.user.email;

  const habits = await getCollection("habits");
  const completions = await getCollection("habit_completions");

  /** 1️⃣ Delete habit */
  const habitResult = await habits.deleteOne({
    _id: habitId,
    userId: userEmail,
  });

  if (habitResult.deletedCount === 0) {
    return NextResponse.json(
      { error: "Habit not found" },
      { status: 404 }
    );
  }

  /** 2️⃣ Cascade delete completions */
  const completionsResult = await completions.deleteMany({
    habitId,
    userEmail,
  });

  console.log("🗑️ HABIT DELETED:", id);
  console.log("🗑️ COMPLETIONS DELETED:", completionsResult.deletedCount);

  return NextResponse.json({
    success: true,
    deletedCompletions: completionsResult.deletedCount,
  });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, archived } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Habit id required" }, { status: 400 });
  }

  if (typeof archived !== "boolean") {
    return NextResponse.json({ error: "Archived boolean required" }, { status: 400 });
  }

  const habits = await getCollection("habits");

  const result = await habits.findOneAndUpdate(
    {
      _id: new ObjectId(id),
      userId: session.user.email,
    },
    { $set: { archived } },
    { returnDocument: "after" }
  );

  const updatedHabit = result?.value;

  if (!updatedHabit) {
    return NextResponse.json({ error: "Habit not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: updatedHabit._id.toString(),
    archived: updatedHabit.archived,
  });
}

