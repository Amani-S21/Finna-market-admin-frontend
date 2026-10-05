"use client";

import type { ReactNode } from "react";
import WorkspaceLayout from "../_components/WorkspaceLayout";
import SideBar from "../_components/SideBar";

export default function Layout({ children }: { children: ReactNode }) {
  return <WorkspaceLayout sidebar={<SideBar />} title="Marché">{children}</WorkspaceLayout>;
}
