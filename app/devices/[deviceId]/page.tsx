"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";

export default function DevicePage() {
  const { deviceId } = useParams();
  if (!deviceId) return null;

  return (
    <main>
      <Topbar />
      <PageTitle>{`Device ${deviceId} details`}</PageTitle>
      <DeviceDetails id={parseInt(String(deviceId))} />
    </main>
  );
}

type DeviceDetailsProps = {
  id: number;
};
const DeviceDetails = ({ id }: DeviceDetailsProps) => {
  const router = useRouter();
  const goBackToHomePage = useCallback(() => router.push("/"), []);

  return (
    <div className="mt-10 p-4 max-w-md mx-auto border border-gray-300 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Device Details</h1>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Name:</strong> Example Device
      </p>
      <p>
        <strong>Mobile Number:</strong> +1234567890
      </p>
      <p>
        <strong>Last Connection:</strong> 2024-12-14 12:34:56
      </p>
      <p>
        <strong>Latitude:</strong> 40.7128
      </p>
      <p>
        <strong>Longitude:</strong> -74.0060
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={goBackToHomePage}
      >
        Go Back
      </button>
    </div>
  );
};
