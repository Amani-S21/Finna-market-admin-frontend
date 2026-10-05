"use client";

import { AiOutlineProduct } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import WorkspaceSidebar from "@/app/_components/WorkspaceSidebar";

const TranportSuperAdminSideBar = () => <WorkspaceSidebar links={links} title="Transport" />;

const links = [
  {
    href: "/transport/dashboard",
    label: "Accueil",
    icon: <LuLayoutDashboard />,
  },
  {
    href: "/transport/agencies/list?page=1",
    label: "Agences",
    icon: <AiOutlineProduct />,
  },
  {
    href: "/transport/vehicle-types/list?page=1",
    label: "Type d'engins",
    icon: <AiOutlineProduct />,
  },
  {
    href: "/transport/places/list?page=1",
    label: "Places",
    icon: <AiOutlineProduct />,
  },
];

export default TranportSuperAdminSideBar;
