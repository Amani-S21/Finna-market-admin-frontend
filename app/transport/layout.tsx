"use client";

import type { ReactNode } from "react";
import WorkspaceLayout from "../_components/WorkspaceLayout";
import TransportSideBar from "./_components/SideBar";

export default function Layout({ children }: { children: ReactNode }) {
  return <WorkspaceLayout sidebar={<TransportSideBar />} title="Transport">{children}</WorkspaceLayout>;
}
