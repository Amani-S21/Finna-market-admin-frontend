"use client";

import logo from "@/public/logo.png";
import classNames from "classnames";
import { BedDouble, Hotel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BookingSuperAdminSideBar = () => {
  return (
    <div className="min-w-62.5 border-r border-gray-200 h-screen bg-gray-50 flex flex-col items-start sticky top-0 px-10">
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
              "hover:text-blue-700": true,
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
    href: "/booking/dashboard",
    label: "Accueil",
    icon: <Hotel />,
  },
  {
    href: "/booking/hotels/list?page=1",
    label: "Entréprises",
    icon: <Hotel />,
  },
  {
    href: "/booking/room-categories/list?page=1",
    label: "Chambres",
    icon: <BedDouble />,
  },
  {
    href: "/booking/bookings/list?page=1",
    label: "Réservations",
    icon: <BedDouble />,
  },
];

export default BookingSuperAdminSideBar;
