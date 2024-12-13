import Image from "next/image";
import Link from "next/link";

const Topbar = () => (
  <nav className="flex items-center bg-white px-6 py-4">
    <Image
      src="/logo.png"
      alt="Vodafone logo"
      width={35}
      height={35}
      priority
    />
    <ul className="flex gap-2 ml-10 text-black">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/devices">Devices</Link>
      </li>
    </ul>
  </nav>
);

export default Topbar;
