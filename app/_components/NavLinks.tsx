"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { GrDeliver } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {
      href: "/market/products?page=1",
      label: "Produits",
      icon: <AiOutlineProduct />,
    },
    { href: "/market/delivers", label: "Livreurs", icon: <GrDeliver /> },
    {
      href: "/market/shops?page=1",
      label: "Boutiques",
      icon: <IoStorefrontOutline />,
    },
  ];

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
export default NavLinks;
