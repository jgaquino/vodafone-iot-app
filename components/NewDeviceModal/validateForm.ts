import Device from "@/types/Device";
import { type DeviceFormErrors } from "./NewDeviceModal";

const validateForm = (errors: DeviceFormErrors, newDevice: Device) => {
  const newErrors = { ...errors };
  let isValid = true;

  if (!newDevice.name) {
    newErrors.name = "Name is required.";
    isValid = false;
  } else {
    newErrors.name = "";
  }

  if (!mobileNumberRegex.test(newDevice.mobileNumber)) {
    newErrors.mobileNumber = "Mobile Number is not valid.";
    isValid = false;
  } else {
    newErrors.mobileNumber = "";
  }

  if (!newDevice.lastConnection) {
    newErrors.lastConnection = "Last Connection is required.";
    isValid = false;
  } else {
    newErrors.lastConnection = "";
  }

  if (!latitudeRegex.test(newDevice.latitude)) {
    newErrors.latitude = "Latitude is not valid.";
    isValid = false;
  } else {
    newErrors.latitude = "";
  }

  if (!longitudeRegex.test(newDevice.longitude)) {
    newErrors.longitude = "Longitude is not valid.";
    isValid = false;
  } else {
    newErrors.longitude = "";
  }

  return { newErrors, isValid };
};

const mobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const latitudeRegex = /^([-+]?(?:90(?:\.0{1,6})?|[1-9]?[0-9](?:\.\d{1,6})?))$/;
const longitudeRegex =
  /^([-+]?(?:180(?:\.0{1,6})?|[1-9]?[0-9]{1,2}(?:\.\d{1,6})?))$/;

export default validateForm;
