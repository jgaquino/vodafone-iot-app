import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import type Device from "@/types/Device";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { type LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

type MarkerType = {
  deviceId?: number;
  label: string;
  position: LatLngExpression;
};

type MapProps = {
  devices: Device[];
};
export default function Map({ devices }: MapProps) {
  const markers = useMarkers(devices);
  const router = useRouter();

  const handleMarkerClick = useCallback((deviceId?: number) => {
    if (!deviceId) return;
    router.push(`/devices/${deviceId}`);
  }, []);

  return (
    <MapContainer
      center={MALAGA_CENTER_POSITION}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {markers.map((marker: MarkerType, index: number) => (
          <Marker
            key={index}
            position={marker.position}
            eventHandlers={{
              click: () => handleMarkerClick(marker.deviceId),
            }}
          >
            <Tooltip>
              <p>{marker.label}</p>
              <p>
                ID: <strong>#{marker.deviceId}</strong>
              </p>
            </Tooltip>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

const useMarkers = (devices: Device[]) => {
  const markers: MarkerType[] = useMemo(
    () =>
      devices.map((device: Device) => ({
        label: device.name,
        deviceId: device.id,
        position: [parseFloat(device.latitude), parseFloat(device.longitude)],
      })),
    [devices]
  );

  return markers;
};

const MALAGA_CENTER_POSITION: LatLngExpression = [
  36.732143179858795, -4.422340393066407,
];
