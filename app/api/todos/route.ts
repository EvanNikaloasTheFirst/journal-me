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

  const collection = await getCollection("todos");

  const doc = {
    userId: session.user.email,
    text,
    completed: false,
    locked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await collection.insertOne(doc);

  return NextResponse.json(
    { _id: result.insertedId.toString(), ...doc },
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
  const all = searchParams.get("all") === "true";

  const collection = await getCollection("todos");

  const query: any = { userId: session.user.email };

  // 🔮 future-proof: only apply date filter if NOT loading all
  if (!all) {
    // example if you later add daily todos
    // query.date = today;
  }

  const todos = await collection
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(todos);
}

/* ================= UPDATE ================= */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, completed, locked, text } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const collection = await getCollection("todos");

  await collection.updateOne(
    { _id: new ObjectId(id), userId: session.user.email },
    {
      $set: {
        ...(completed !== undefined && { completed }),
        ...(locked !== undefined && { locked }),
        ...(text !== undefined && { text }),
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

  const collection = await getCollection("todos");

  await collection.deleteOne({
    _id: new ObjectId(id),
    userId: session.user.email,
  });

  return NextResponse.json({ success: true });
}
