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

  const deleteDevice = (id: number) => {
    if (!confirm(`Are you sure you want to delete the device with ID ${id}?`))
      return;

    fetch(`/api/devices?deviceId=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setDevices((prevDevices) =>
            prevDevices.filter((device) => device.id !== id)
          );
        } else {
          alert("Failed to delete device.");
        }
      })
      .catch(() => alert("Something went wrong..."));
  };

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
      <DevicesTable devices={devices} onDeleteDevice={deleteDevice} />
      <NewDeviceModal
        isOpen={modalVisibility}
        onClose={() => setModalVisibility(false)}
        onAddDevice={(device: Device) => setNewDevice(device)}
      />
    </main>
  );
}

type DevicesTableProps = {
  devices: Device[];
  onDeleteDevice: (id: number) => void;
};

const DevicesTable = ({ devices, onDeleteDevice }: DevicesTableProps) => {
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
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
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
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onDeleteDevice(device.id!);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
