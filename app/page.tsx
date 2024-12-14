"use client";

import { useState, useEffect } from "react";
import Map from "@/components/Map";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";
import type Device from "@/types/Device";

export default function HomePage() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetch("/api/devices")
      .then((response) => response.json())
      .then((data) => {
        setDevices(data.devices);
      })
      .catch(() => alert("Something went wrong..."));
  }, []);

  return (
    <main>
      <Topbar />
      <PageTitle>Home</PageTitle>
      <Map devices={devices} />
    </main>
  );
}
