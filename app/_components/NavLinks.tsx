"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineOrderedList, AiOutlineProduct } from "react-icons/ai";
import { FaClipboardUser } from "react-icons/fa6";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { TbCategoryMinus } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
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
    },
    {
      href: "/market/categories/list?page=1",
      label: "Catégories",
      icon: <TbCategoryMinus />,
    },
    {
      href: "/market/features/list?page=1",
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
