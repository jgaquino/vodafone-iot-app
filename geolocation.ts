import { type LatLngExpression } from "leaflet";

const geolocation = async (): Promise<LatLngExpression | null> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve([latitude, longitude]);
        },
        function () {
          reject("Geolocation is not supported by this browser.");
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

export default geolocation;
