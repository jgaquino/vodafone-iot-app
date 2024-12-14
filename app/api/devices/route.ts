import { NextRequest, NextResponse } from "next/server";
import type { InsertOneResult, DeleteResult } from "mongodb";
import { connectAndGetDatabase } from "@/lib/mongodb";
import type Device from "@/types/Device";

const DEVICES_COLLECTION = "devices";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");

    const DB = await connectAndGetDatabase();

    if (!deviceId) {
      const devices = await DB.collection(DEVICES_COLLECTION).find().toArray();
      return NextResponse.json({ devices });
    } else {
      const device = await DB.collection(DEVICES_COLLECTION).findOne({
        id: parseInt(deviceId),
      });
      return NextResponse.json({ device });
    }
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
    const lastDeviceCreated = await devicesCollection.findOne(
      {},
      { sort: { createdAt: -1 } }
    );

    const newDevice: Device = {
      id: lastDeviceCreated ? lastDeviceCreated.id + 1 : 1,
      createdAt: new Date(),
      ...device,
    };
    const result: InsertOneResult = await devicesCollection.insertOne(
      newDevice
    );

    if (result.acknowledged) {
      return NextResponse.json(newDevice);
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("deviceId");

    if (!deviceId) {
      return NextResponse.json(
        { error: "Device ID is required" },
        { status: 400 }
      );
    }

    const DB = await connectAndGetDatabase();
    const devicesCollection = DB.collection(DEVICES_COLLECTION);

    const result: DeleteResult = await devicesCollection.deleteOne({
      id: parseInt(deviceId),
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json(
        { error: `Device #${deviceId} not found` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
