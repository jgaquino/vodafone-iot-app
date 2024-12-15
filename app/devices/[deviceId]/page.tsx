"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";
import Device from "@/types/Device";
import { useDevice } from "@/devices-api-hooks";

export default function DevicePage() {
  const { deviceId } = useParams();
  const { device, loading } = useDevice(String(deviceId));

  if (!deviceId) return null;
  if (!device) return null;
  if (loading) return <LoadingSpinner />;

  return (
    <main>
      <Topbar />
      <PageTitle>{`Device ${deviceId} details`}</PageTitle>
      <DeviceDetails device={device} />
    </main>
  );
}

type DeviceDetailsProps = {
  device: Device;
};
const DeviceDetails = ({ device }: DeviceDetailsProps) => {
  const router = useRouter();

  const goToHomePage = useCallback(() => router.push("/"), []);
  const goToDevicesPage = useCallback(() => router.push("/devices"), []);

  return (
    <div className="mt-10 p-4 max-w-md mx-auto border border-gray-300 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Device Details</h1>
      <p>
        <strong>Created at:</strong> {String(device.createdAt)}
      </p>
      <p>
        <strong>ID:</strong> {device.id}
      </p>
      <p>
        <strong>Name:</strong> {device.name}
      </p>
      <p>
        <strong>Mobile Number:</strong> {device.mobileNumber}
      </p>
      <p>
        <strong>Last Connection:</strong> {device.lastConnection}
      </p>
      <p>
        <strong>Latitude:</strong> {device.latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {device.longitude}
      </p>
      <div className="flex justify-between">
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={goToDevicesPage}
        >
          Devices page
        </button>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={goToHomePage}
        >
          Home page
        </button>
      </div>
    </div>
  );
};
