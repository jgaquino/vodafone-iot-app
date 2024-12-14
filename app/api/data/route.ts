import { NextResponse } from "next/server";
import { connectAndGetDatabase } from "../../../lib/mongodb";

export async function GET() {
  try {
    const DB = await connectAndGetDatabase();
    const data = await DB.collection("test").find().toArray();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
