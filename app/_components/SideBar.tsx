import { useSession } from "next-auth/react";
import React from "react";
import SuperMarketAdminSideBar from "./SuperMarketAdminSideBar";
import SuperAdminSideBar from "./SuperAdminSideBar";

const SideBar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return;

  const affectations = session?.data?.shopAffectations;

  if (affectations && affectations.length > 0) {
    if (affectations[0].role === "SUPER_MARKET_ADMIN") {
      return <SuperMarketAdminSideBar />;
    }
  }

  return <SuperAdminSideBar />;
};

export default SideBar;
