"use client";

import { IoStorefrontOutline } from "react-icons/io5";
import { AiOutlineOrderedList } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import WorkspaceSidebar from "@/app/_components/WorkspaceSidebar";

const SuperAdminSideBar = () => <WorkspaceSidebar links={links} title="Marché" />;

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
    href: "/market/users/list?page=1",
    label: "Utilisateurs",
    icon: <FaUsers />,
  },
  // {
  //   href: "/market/orders/list?page=1",
  //   label: "Commandes",
  //   icon: <AiOutlineOrderedList />,
  // },
  {
    href: "/market/shop-orders/list?page=1",
    label: "Commandes",
    icon: <AiOutlineOrderedList />,
  },
  {
    href: "/market/shops/list?page=1",
    label: "Boutiques",
    icon: <IoStorefrontOutline />,
  },
  // {
  //   href: "/market/categories/list?page=1",
  //   label: "Catégories",
  //   icon: <TbCategoryMinus />,
  // },
  // {
  //   href: "/market/sub-categories/list?page=1",
  //   label: "Sous-Catégories",
  //   icon: <TbCategoryMinus />,
  // },
  // {
  //   href: "/market/features/list?page=1",
  //   label: "Caractéristiques",
  //   icon: <MdOutlineFeaturedPlayList />,
  // },
  // {
  //   href: "/market/taxes/list?page=1",
  //   label: "Taxes",
  //   icon: <DollarSign size={18} />,
  // },
];

export default SuperAdminSideBar;
