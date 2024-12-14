import { NextRequest, NextResponse } from "next/server";
import type { InsertOneResult, DeleteResult } from "mongodb";
import { connectAndGetDatabase } from "@/lib/mongodb";

const DEVICES_COLLECTION = "devices";

export async function GET() {
  try {
    const DB = await connectAndGetDatabase();
    const devices = await DB.collection(DEVICES_COLLECTION).find().toArray();

    return NextResponse.json({ devices });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { device } = await request.json();

    if (!device) {
      return NextResponse.json(
        { error: "Device data is required" },
        { status: 400 }
      );
    }

    const DB = await connectAndGetDatabase();
    const devicesCollection = DB.collection(DEVICES_COLLECTION);
    const result: InsertOneResult = await devicesCollection.insertOne(device);

    if (result.acknowledged) {
      return NextResponse.json({ device }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Failed to insert device" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error adding device:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Device ID is required" },
        { status: 400 }
      );
    }

    const DB = await connectAndGetDatabase();
    const devicesCollection = DB.collection(DEVICES_COLLECTION);

    const result: DeleteResult = await devicesCollection.deleteOne({ id });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: "Device deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
