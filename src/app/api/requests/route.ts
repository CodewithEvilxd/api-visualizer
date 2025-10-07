import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ items: [] });
  const items = await db.collection("requests").find({}).sort({ _id: -1 }).limit(50).toArray();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const db = await getDb();
  const payload = await req.json();
  if (!db) return NextResponse.json({ ok: false });
  await db.collection("requests").insertOne({ ...payload, createdAt: new Date() });
  return NextResponse.json({ ok: true });
}


