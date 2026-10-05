"use client";

import type { ReactNode } from "react";
import WorkspaceLayout from "../_components/WorkspaceLayout";
import BookingSideBar from "./_components/SideBar";

export default function Layout({ children }: { children: ReactNode }) {
  return <WorkspaceLayout sidebar={<BookingSideBar />} title="Réservation">{children}</WorkspaceLayout>;
}
