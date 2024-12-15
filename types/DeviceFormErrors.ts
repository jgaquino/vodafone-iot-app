import type Device from "./Device";

type DeviceFormErrors = Omit<Device, "id" | "createdAt" | "lastConnection"> & {
  lastConnection: string;
};

export default DeviceFormErrors;
