import { Roles } from "@/app/lib/types";
import { useSession } from "next-auth/react";
import React from "react";
import TranportSuperAdminSideBar from "./SuperMarketAdminSideBar";

const TransportSideBar = () => {
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

  return <TranportSuperAdminSideBar />;
};

export default TransportSideBar;
