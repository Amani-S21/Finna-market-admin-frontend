import Link from "next/link";
import NavLinks from "./NavLinks";
import logo from "@/public/logo.png";
import Image from "next/image";

const SideBar = () => {
  return (
    <div className="min-w-[250px] border-r border-gray-200 h-screen bg-gray-50 flex flex-col items-start sticky top-0 px-10">
      <div className="self-center mt-8 mb-16">
        <Link href="/">
          <Image src={logo} height={30} width={150} alt="logo" />
        </Link>
      </div>

      <NavLinks />
    </div>
  );
};

export default SideBar;
