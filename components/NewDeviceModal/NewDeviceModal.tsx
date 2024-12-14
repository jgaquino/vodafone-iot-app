import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import * as Dialog from "toldo";
import type Device from "@/types/Device";
import validateForm from "./validateForm";

type DeviceFormErrors = Omit<Device, "id" | "createdAt">;
type NewDeviceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddDevice: (device: Device) => void;
};
const NewDeviceModal = ({
  isOpen,
  onClose,
  onAddDevice,
}: NewDeviceModalProps) => {
  const [newDevice, setNewDevice] = useState<Device>(DEFAULT_DEVICE);
  const [errors, setErrors] = useState<DeviceFormErrors>({
    name: "",
    mobileNumber: "",
    lastConnection: "",
    latitude: "",
    longitude: "",
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDevice((prevDevice) => ({ ...prevDevice, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const { newErrors, isValid } = validateForm(errors, newDevice);
      setErrors(newErrors);
      if (!isValid) return;

      onAddDevice(newDevice);
      setNewDevice(DEFAULT_DEVICE);
      onClose();
    },
    [newDevice, errors]
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-50" />
        <Dialog.Content className="fixed inset-0 flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-auto">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Add New Device
            </Dialog.Title>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newDevice.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Mobile Number</label>
                <p className="text-xs">Format +00123456789</p>
                <input
                  type="text"
                  name="mobileNumber"
                  value={newDevice.mobileNumber}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.mobileNumber ? "border-red-500" : ""
                  }`}
                />
                {errors.mobileNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.mobileNumber}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Last Connection</label>
                <input
                  type="date"
                  name="lastConnection"
                  value={newDevice.lastConnection}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.lastConnection ? "border-red-500" : ""
                  }`}
                />
                {errors.lastConnection && (
                  <span className="text-red-500 text-sm">
                    {errors.lastConnection}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={newDevice.latitude}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.latitude ? "border-red-500" : ""
                  }`}
                />
                {errors.latitude && (
                  <span className="text-red-500 text-sm">
                    {errors.latitude}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={newDevice.longitude}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.longitude ? "border-red-500" : ""
                  }`}
                />
                {errors.longitude && (
                  <span className="text-red-500 text-sm">
                    {errors.longitude}
                  </span>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const DEFAULT_DEVICE: Device = {
  name: "",
  mobileNumber: "",
  lastConnection: "",
  latitude: "",
  longitude: "",
};

export default NewDeviceModal;
