import type { ReactNode } from "react";
import FormDialog from "@/app/_components/FormDialog";

export default function Layout({ children }: { children: ReactNode }) {
  return <FormDialog title="Modifier le mot de passe" fallback="/profile/details">{children}</FormDialog>;
}
