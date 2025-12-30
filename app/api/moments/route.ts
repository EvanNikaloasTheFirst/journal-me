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

  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text required" }, { status: 400 });
  }

  const now = new Date();

  const collection = await getCollection("moments");

  const doc = {
    userId: session.user.email,
    text,
    year: now.getFullYear(),
    month: now.getMonth()+1, // 0–11
    day: now.getDate(),
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(doc);

  return NextResponse.json(
    { _id: result.insertedId.toString(), ...doc },
    { status: 201 }
  );
}

/* ================= READ ================= */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

    const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // JS months are 0-based
  const collection = await getCollection("moments");
console.log(currentYear, currentMonth)
const moments = await collection
    .find({
      userId: session.user.email,
      year: currentYear,
      month: currentMonth,
    })
    .sort({ day: 1 }) // optional: chronological within month
    .toArray();

  return NextResponse.json(moments);
}

/* ================= UPDATE ================= */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, text } = await req.json();

  if (!id || !text) {
    return NextResponse.json(
      { error: "Missing id or text" },
      { status: 400 }
    );
  }

  const collection = await getCollection("moments");

  await collection.updateOne(
    { _id: new ObjectId(id), userId: session.user.email },
    {
      $set: {
        text,
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

  const collection = await getCollection("moments");

  await collection.deleteOne({
    _id: new ObjectId(id),
    userId: session.user.email,
  });

  return NextResponse.json({ success: true });
}
