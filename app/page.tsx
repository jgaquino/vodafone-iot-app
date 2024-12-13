import Map from "@/components/Map";
import PageTitle from "@/components/PageTitle";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <main>
      <Topbar />
      <PageTitle>Home</PageTitle>
      <Map />
    </main>
  );
}
