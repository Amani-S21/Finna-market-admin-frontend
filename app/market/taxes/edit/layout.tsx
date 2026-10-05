import type { ReactNode } from "react";
import FormDialog from "@/app/_components/FormDialog";

export default function Layout({ children }: { children: ReactNode }) {
  return <FormDialog title="Modifier · Taxe" fallback="/market/taxes/list?page=1">{children}</FormDialog>;
}
