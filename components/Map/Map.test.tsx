import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import Map from "@/components/Map";
import Device from "@/types/Device";
import exampleDevices from "@/devices.json";

const formatDevicesData = (devices: any) =>
  devices.map((device: any) => ({
    ...device,
    lastConnection: new Date(device.lastConnection),
  }));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ eventHandlers, position }: any) => (
    <div
      data-testid="marker"
      data-position={JSON.stringify(position)}
      onClick={() => eventHandlers?.click()}
    />
  ),
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  ),
  useMap: () => ({
    setView: jest.fn(),
  }),
}));

jest.mock("react-leaflet-markercluster", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="marker-cluster">{children}</div>
  ),
}));

describe("Map Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  it("renders map with markers", async () => {
    const devices: Device[] = formatDevicesData(exampleDevices);

    await act(async () => {
      render(<Map devices={devices} />);
    });

    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("marker-cluster")).toBeInTheDocument();
    expect(screen.getAllByTestId("marker")).toHaveLength(20);
  });

  it("navigates to device page on marker click", async () => {
    const devices: Device[] = formatDevicesData([exampleDevices[0]]);

    await act(async () => {
      render(<Map devices={devices} />);
    });

    const marker = screen.getByTestId("marker");

    await act(async () => {
      await userEvent.click(marker);
    });

    expect(mockPush).toHaveBeenCalledWith("/devices/1");
  });
});
