"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrDeliver } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

const SideBar = () => {
  return (
    <div className="min-w-[260px] border-r border-gray-200 h-screen bg-gray-50 flex flex-col items-start sticky top-0 px-10">
      <div className="h-[80px] w-[80px] self-center mt-8 mb-16"></div>

      <NavLinks />
    </div>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/market/delivers", label: "Livreurs", icon: <GrDeliver /> },

    {
      href: "/market/shops",
      label: "Boutiques",
      icon: <IoStorefrontOutline />,
    },
  ];

  return (
    <ul className="space-y-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "text-blue-400 font-bold": link.href === currentPath,
            })}
          >
            <div className="mt-5 flex items-center space-x-4">
              {link.icon}
              <span>{link.label}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideBar;
