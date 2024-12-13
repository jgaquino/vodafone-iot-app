export default function Devices() {
  return (
    <main>
      <DevicesTable />
    </main>
  );
}

const DevicesTable = () => {
  const devices = [
    {
      id: 1,
      name: "Device 1",
      mobileNumber: "+1234567890",
      lastConnection: "2024-12-13 12:00 PM",
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      id: 2,
      name: "Device 2",
      mobileNumber: "+0987654321",
      lastConnection: "2024-12-13 11:45 AM",
      latitude: 34.0522,
      longitude: -118.2437,
    },
  ];

  return (
    <div className="overflow-x-auto text-black">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Mobile Number
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Last Connection
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Latitude
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Longitude
            </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr
              key={device.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="border border-gray-300 px-4 py-2">{device.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {device.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.mobileNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.lastConnection}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.latitude}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {device.longitude}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
