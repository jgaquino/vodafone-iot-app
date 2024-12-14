"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";
import NewDeviceModal from "@/components/NewDeviceModal";
import type Device from "@/types/Device";

export default function Devices() {
  const [newDevice, setNewDevice] = useState<Device | null>(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/devices")
      .then((response) => response.json())
      .then((data) => {
        setDevices(data.devices);
      })
      .catch(() => alert("Something went wrong..."));
  }, []);

  useEffect(() => {
    if (!newDevice) return;
    fetch("/api/devices", {
      method: "POST",
      body: JSON.stringify({ device: newDevice }),
    })
      .then((response) => response.json())
      .then((device) => setDevices((prevDevices) => [...prevDevices, device]))
      .catch(() => alert("Something went wrong..."));
  }, [newDevice]);

  return (
    <main>
      <Topbar />
      <PageTitle>Devices</PageTitle>
      <div className="flex justify-end mb-4">
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setModalVisibility(true)}
        >
          Add new device
        </button>
      </div>
      <DevicesTable devices={devices} />
      <NewDeviceModal
        isOpen={modalVisibility}
        onClose={() => setModalVisibility(false)}
        onAddDevice={(device: Device) => setNewDevice(device)}
      />
    </main>
  );
}

type DevicesTable = {
  devices: Device[];
};
const DevicesTable = ({ devices }: DevicesTable) => {
  const router = useRouter();

  const handleRowClick = useCallback(
    (id?: number) => router.push(`/devices/${id}`),
    []
  );

  return (
    <div className="overflow-x-auto text-black">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Mobile Number
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Last Connection
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Latitude
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Longitude
            </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr
              key={device.id}
              onClick={() => handleRowClick(device.id)}
              className={`cursor-pointer ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-200`}
            >
              <td className="border border-gray-300 px-4 py-2">{device.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {device.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.mobileNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.lastConnection}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.latitude}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.longitude}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
