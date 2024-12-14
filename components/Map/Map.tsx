import type Device from "@/types/Device";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { type LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; // Import the marker cluster styles

type MarkerType = {
  position: LatLngExpression;
  label: string;
};

type MapProps = {
  devices: Device[];
};
export default function Map({ devices }: MapProps) {
  const markers: MarkerType[] = devices.map((device: Device) => ({
    label: device.name,
    position: [parseFloat(device.latitude), parseFloat(device.longitude)],
  }));

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
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Tooltip>{marker.label}</Tooltip>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

const MALAGA_CENTER_POSITION: LatLngExpression = [
  36.732143179858795, -4.422340393066407,
];
