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

  const { title, text } = await req.json();

  if (!title || !text) {
    return NextResponse.json(
      { error: "Title and text are required" },
      { status: 400 }
    );
  }

  const collection = await getCollection("journals");

  const doc = {
    userId: session.user.email,
    title,
    text,
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
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const collection = await getCollection("journals");

  const journals = await collection
    .find({ userId: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(journals);
}

/* ================= UPDATE ================= */
/* ================= UPDATE ================= */
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, title, text, createdAt } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const collection = await getCollection("journals");

  await collection.updateOne(
    {
      _id: new ObjectId(id),
      userId: session.user.email,
    },
    {
      $set: {
        ...(title !== undefined && { title }),
        ...(text !== undefined && { text }),
        ...(createdAt !== undefined && {
          createdAt: new Date(createdAt),
        }),
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

  const collection = await getCollection("journals");

  await collection.deleteOne({
    _id: new ObjectId(id),
    userId: session.user.email,
  });

  return NextResponse.json({ success: true });
}


