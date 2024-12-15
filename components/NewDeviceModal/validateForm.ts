import Device from "@/types/Device";
import type DeviceFormErrors from "@/types/DeviceFormErrors";

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

  if (!isValidLatitude(newDevice.latitude)) {
    newErrors.latitude = "Latitude is not valid.";
    isValid = false;
  } else {
    newErrors.latitude = "";
  }

  if (!isValidLongitude(newDevice.longitude)) {
    newErrors.longitude = "Longitude is not valid.";
    isValid = false;
  } else {
    newErrors.longitude = "";
  }

  return { newErrors, isValid };
};

const mobileNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
function isValidLatitude(latitude: string) {
  const parsedLatitude = parseFloat(latitude);
  return (
    !isNaN(parsedLatitude) && parsedLatitude >= -90 && parsedLatitude <= 90
  );
}
function isValidLongitude(longitude: string) {
  const parsedLongitude = parseFloat(longitude);
  return (
    !isNaN(parsedLongitude) && parsedLongitude >= -180 && parsedLongitude <= 180
  );
}

export default validateForm;
