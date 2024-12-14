import { useState, useEffect, Dispatch, SetStateAction } from "react";
import type Device from "./types/Device";

export const useDevice = (deviceId: string) => {
  const [device, setDevice] = useState<Device | null>(null);

  useEffect(() => {
    fetch(`/api/devices?deviceId=${deviceId}`)
      .then((response) => response.json())
      .then((data) => setDevice(data.device))
      .catch(() => alert("Something went wrong..."));
  }, []);

  return { device, setDevice };
};

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/devices")
      .then((response) => response.json())
      .then((data) => {
        setDevices(data.devices);
      })
      .catch(() => alert("Something went wrong..."));
  }, []);

  return { devices, setDevices };
};

export const useAddNewDevice = (
  setDevices: Dispatch<SetStateAction<Device[]>>
) => {
  const addNewDevice = (newDevice: Device) => {
    fetch("/api/devices", {
      method: "POST",
      body: JSON.stringify({ device: newDevice }),
    })
      .then((response) => response.json())
      .then((device) => setDevices((prevDevices) => [...prevDevices, device]))
      .catch(() => alert("Something went wrong..."));
  };

  return addNewDevice;
};

export const useDeleteDevice = (
  setDevices: Dispatch<SetStateAction<Device[]>>
) => {
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

  return deleteDevice;
};
