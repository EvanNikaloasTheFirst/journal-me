import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

/* ================= CREATE ================= */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { goal, year } = await req.json();


  if (!goal || !year) {
    return NextResponse.json(
      { error: "Goal and year are required" },
      { status: 400 }
    );
  }

  const collection = await getCollection("yearlyGoals");

  const doc = {
    userId: session.user.email,
    goal,
    year: Number(year),
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };



  const result = await collection.insertOne(doc);

  return NextResponse.json(
    { id: result.insertedId.toString(), ...doc },
    { status: 201 }
  );
}

/* ================= READ ================= */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const year = searchParams.get("year");

  const collection = await getCollection("yearlyGoals");

  const query: any = {
    userId: session.user.email,
  };

  if (year) {
    query.year = Number(year);
  }

  const goals = await collection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(goals);
}

/* ================= UPDATE ================= */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, goal, completed } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const collection = await getCollection("yearlyGoals");

  await collection.updateOne(
    { _id: new ObjectId(id), userId: session.user.email },
    {
      $set: {
        ...(goal !== undefined && { goal }),
        ...(completed !== undefined && { completed }),
        updatedAt: new Date(),
      },
    }
  );

  return NextResponse.json({ success: true });
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const collection = await getCollection("yearlyGoals");

  await collection.deleteOne({
    _id: new ObjectId(id),
    userId: session.user.email,
  });

  return NextResponse.json({ success: true });
}
