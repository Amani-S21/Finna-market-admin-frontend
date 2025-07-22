import { useSession } from "next-auth/react";
import React from "react";
import SuperMarketAdminSideBar from "./SuperMarketAdminSideBar";
import SuperAdminSideBar from "./SuperAdminSideBar";
import { Roles } from "../lib/types";
import DeliveriesAdminSideBar from "./DeliveriesAdminSideBar";

const SideBar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return;

  const affectations = session?.data?.shopAffectations ?? [];

  const role = () => {
    if (affectations.length > 0) {
      if (affectations && affectations.length > 0) {
        return affectations[0].role as Roles;
      }
    } else {
      return session?.data.role as Roles;
    }
  };

  if (role() === "SUPER_MARKET_ADMIN") {
    return <SuperMarketAdminSideBar />;
  } else if (role() === "SUPER_ADMIN") {
    return <SuperAdminSideBar />;
  }

  return <DeliveriesAdminSideBar />;
};

export default SideBar;
