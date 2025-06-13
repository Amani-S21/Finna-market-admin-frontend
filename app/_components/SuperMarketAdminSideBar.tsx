"use client";

import logo from "@/public/logo.png";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineOrderedList, AiOutlineProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";

const SuperMarketAdminSideBar = () => {
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

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ul className="space-y-6 flex flex-col">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "text-blue-700 font-bold":
                link.href.split("?")[0] === currentPath,
            })}
          >
            <div className="flex items-center space-x-2">
              {link.icon}
              <span>{link.label}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const links = [
  {
    href: "/market/dashboard",
    label: "Accueil",
    icon: <LuLayoutDashboard />,
  },
  {
    href: "/market/products/list?page=1",
    label: "Produits",
    icon: <AiOutlineProduct />,
  },
  {
    href: "/market/users/list?page=1",
    label: "Utilisateurs",
    icon: <FaUsers />,
  },
  {
    href: "/market/orders/list?page=1",
    label: "Commandes",
    icon: <AiOutlineOrderedList />,
  },
  {
    href: "/market/shops/list?page=1",
    label: "Boutiques",
    icon: <IoStorefrontOutline />,
  }
];

export default SuperMarketAdminSideBar;
