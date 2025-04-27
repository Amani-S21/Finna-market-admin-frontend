"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { GrDeliver } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { TbCategoryMinus } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";

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
      href: "/market/orders",
      label: "Commandes",
      icon: <AiOutlineOrderedList />,
    },
    {
      href: "/market/shops?page=1",
      label: "Boutiques",
      icon: <IoStorefrontOutline />,
    },
    {
      href: "/market/categories?page=1",
      label: "Catégories",
      icon: <TbCategoryMinus />,
    },
    {
      href: "/market/features?page=1",
      label: "Caractéristiques",
      icon: <MdOutlineFeaturedPlayList />,
    },
    {
      href: "/market/profile?page=1",
      label: "Profile",
      icon: <VscAccount />,
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
