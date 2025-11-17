import { useSession } from "next-auth/react";
import React from "react";
import TranportSuperAdminSideBar from "./SuperMarketAdminSideBar";

const TransportSideBar = () => {
  const { status } = useSession();

  if (status === "loading") return;

  

  

  return <TranportSuperAdminSideBar />;
};

export default TransportSideBar;
