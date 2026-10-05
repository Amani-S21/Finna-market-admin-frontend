import type { ReactNode } from "react";
import FormDialog from "@/app/_components/FormDialog";

export default function Layout({ children }: { children: ReactNode }) {
  return <FormDialog title="Ajouter · Produit" fallback="/market/shops/list?page=1">{children}</FormDialog>;
}
