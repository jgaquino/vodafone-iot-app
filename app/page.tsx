"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Map from "@/components/Map";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";
import { useDevices } from "@/devices-api-hooks";

export default function HomePage() {
  const { devices, loading } = useDevices();

  if (loading) return <LoadingSpinner />;

  return (
    <main>
      <Topbar />
      <PageTitle>Home</PageTitle>
      <Map devices={devices} />
    </main>
  );
}
