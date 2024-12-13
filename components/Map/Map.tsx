import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

type MarkerType = {
  position: LatLngExpression;
  label: string;
};

const markers: MarkerType[] = [
  { position: [51.5074, -0.1278], label: "London" },
  { position: [48.8566, 2.3522], label: "Paris" },
  { position: [52.52, 13.405], label: "Berlin" },
  { position: [40.4168, -3.7038], label: "Madrid" },
  { position: [41.9028, 12.4964], label: "Rome" },
  { position: [52.3676, 4.9041], label: "Amsterdam" },
  { position: [48.2082, 16.3738], label: "Vienna" },
  { position: [50.8503, 4.3517], label: "Brussels" },
  { position: [47.3769, 8.5417], label: "Zurich" },
  { position: [37.9838, 23.7275], label: "Athens" },
  { position: [38.7169, -9.1395], label: "Lisbon" },
  { position: [59.3293, 18.0686], label: "Stockholm" },
  { position: [59.9139, 10.7522], label: "Oslo" },
  { position: [55.6761, 12.5683], label: "Copenhagen" },
  { position: [60.1692, 24.9402], label: "Helsinki" },
];

export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Tooltip>{marker.label}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
