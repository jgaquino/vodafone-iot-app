import { useState, useEffect, Dispatch, SetStateAction } from "react";
import type Device from "./types/Device";

const BASE_URI_ENDPOINT = "/api/devices";

export const useDevice = (deviceId: string) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    setLoading(true);
    fetch(`${BASE_URI_ENDPOINT}?deviceId=${deviceId}`)
      .then((response) => response.json())
      .then((data) => {
        setDevice(data.device);
        timeout = setTimeout(() => setLoading(false), 600);
      })
      .catch(() => {
        alert("Something went wrong...");
        timeout = setTimeout(() => setLoading(false), 600);
      });
  }, [deviceId]);

  return { device, setDevice, loading };
};

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    setLoading(true);

    fetch(BASE_URI_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        setDevices(data.devices);
        timeout = setTimeout(() => setLoading(false), 600);
      })
      .catch(() => {
        alert("Something went wrong...");
        timeout = setTimeout(() => setLoading(false), 600);
      });

    return () => clearTimeout(timeout);
  }, []);

  return { devices, setDevices, loading };
};

export const useAddNewDevice = (
  setDevices: Dispatch<SetStateAction<Device[]>>
) => {
  const [loading, setLoading] = useState<boolean>(false);

  const addNewDevice = (newDevice: Device) => {
    let timeout: ReturnType<typeof setTimeout>;
    setLoading(true);
    fetch(BASE_URI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device: newDevice }),
    })
      .then((response) => response.json())
      .then((device) => {
        setDevices((prevDevices) => [...prevDevices, device]);
        timeout = setTimeout(() => setLoading(false), 600);
      })
      .catch(() => {
        alert("Something went wrong...");
        timeout = setTimeout(() => setLoading(false), 600);
      });
  };

  return { addNewDevice, loading };
};

export const useDeleteDevice = (
  setDevices: Dispatch<SetStateAction<Device[]>>
) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteDevice = (id: number) => {
    if (!confirm(`Are you sure you want to delete the device with ID ${id}?`))
      return;

    let timeout: ReturnType<typeof setTimeout>;
    setLoading(true);

    fetch(`${BASE_URI_ENDPOINT}?deviceId=${id}`, {
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
        timeout = setTimeout(() => setLoading(false), 600);
      })
      .catch(() => {
        alert("Something went wrong...");
        timeout = setTimeout(() => setLoading(false), 600);
      });
  };

  return { deleteDevice, loading };
};
