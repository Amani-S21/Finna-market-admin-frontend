"use client";

import { AiOutlineOrderedList } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import WorkspaceSidebar from "@/app/_components/WorkspaceSidebar";

const DeliveriesAdminSideBar = () => <WorkspaceSidebar links={links} title="Livraisons" />;

const links = [
  {
    href: "/market/dashboard",
    label: "Accueil",
    icon: <LuLayoutDashboard />,
  },
  {
    href: "/market/orders/list?page=1",
    label: "Commandes",
    icon: <AiOutlineOrderedList />,
  },
  {
    href: "/market/users/list?page=1&role=DELIVERER",
    label: "Utilisateurs",
    icon: <FaUsers />,
  },
];

export default DeliveriesAdminSideBar;
