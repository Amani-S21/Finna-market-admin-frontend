"use client";

import { DollarSign } from "lucide-react";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import WorkspaceSidebar from "@/app/_components/WorkspaceSidebar";

const SuperMarketAdminSideBar = () => <WorkspaceSidebar links={links} title="Marché" />;

const links = [
  {
    href: "/market/dashboard",
    label: "Accueil",
    icon: <LuLayoutDashboard />,
  },
  // {
  //   href: "/market/products/list?page=1",
  //   label: "Produits",
  //   icon: <AiOutlineProduct />,
  // },
  {
    href: "/market/users/list?page=1&role=SUPER_MARKET_ADMIN",
    label: "Utilisateurs",
    icon: <FaUsers />,
  },
  // {
  //   href: "/market/orders/list?page=1",
  //   label: "Commandes",
  //   icon: <AiOutlineOrderedList />,
  // },
  {
    href: "/market/orders/list?page=1",
    label: "Commandes",
    icon: <AiOutlineOrderedList />,
  },
  {
    href: "/market/shop-taxes/list?page=1",
    label: "Taxes",
    icon: <DollarSign size={18} />,
  },
];

export default SuperMarketAdminSideBar;
