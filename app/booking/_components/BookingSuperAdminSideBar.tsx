"use client";

import { BedDouble, Hotel } from "lucide-react";
import WorkspaceSidebar from "@/app/_components/WorkspaceSidebar";

const BookingSuperAdminSideBar = () => <WorkspaceSidebar links={links} title="Réservation" />;

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
    label: "Catégories",
    icon: <BedDouble />,
  },
  {
    href: "/booking/bookings/list?page=1",
    label: "Réservations",
    icon: <BedDouble />,
  },
];

export default BookingSuperAdminSideBar;
