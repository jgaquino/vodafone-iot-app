"use client";

import Map from "@/components/Map";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";
import { useDevices } from "@/devices-api-hooks";

export default function HomePage() {
  const { devices } = useDevices();

  return (
    <main>
      <Topbar />
      <PageTitle>Home</PageTitle>
      <Map devices={devices} />
    </main>
  );
}
