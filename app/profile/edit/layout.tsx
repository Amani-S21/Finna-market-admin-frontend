import type { ReactNode } from "react";
import FormDialog from "@/app/_components/FormDialog";

export default function Layout({ children }: { children: ReactNode }) {
  return <FormDialog title="Modifier mon profil" fallback="/profile/details">{children}</FormDialog>;
}
