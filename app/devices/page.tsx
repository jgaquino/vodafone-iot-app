"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";
import NewDeviceModal from "@/components/NewDeviceModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import type Device from "@/types/Device";
import {
  useDevices,
  useAddNewDevice,
  useDeleteDevice,
} from "@/devices-api-hooks";

export default function DevicesPage() {
  const { devices, setDevices, loading: devicesLoading } = useDevices();
  const { addNewDevice, loading: addLoading } = useAddNewDevice(setDevices);
  const { deleteDevice, loading: deleteLoading } = useDeleteDevice(setDevices);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const overlayLoading = addLoading || deleteLoading;
  if (devicesLoading) return <LoadingSpinner />;

  return (
    <main>
      <Topbar />
      <PageTitle>Devices</PageTitle>
      <AddNewDeviceButton onClick={() => setModalVisibility(true)} />
      <NewDeviceModal
        isOpen={modalVisibility}
        onClose={() => setModalVisibility(false)}
        onAddDevice={(device: Device) => addNewDevice(device)}
      />
      <DevicesTable devices={devices} onDeleteDevice={deleteDevice} />
      {overlayLoading && <LoadingSpinner />}
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
    [router],
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
                {device.lastConnection &&
                  new Date(device.lastConnection).toLocaleDateString()}
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

const AddNewDeviceButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onClick}
      >
        Add new device
      </button>
    </div>
  );
};
