import { useSession } from "next-auth/react";
import React from "react";
import SuperMarketAdminSideBar from "./SuperMarketAdminSideBar";
import SuperAdminSideBar from "./SuperAdminSideBar";

const SideBar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return;

  if (session?.data.role === "SUPER_MARKET_ADMIN") {
    return <SuperMarketAdminSideBar />;
  } else {
    return <SuperAdminSideBar />;
  }
};

export default SideBar;
