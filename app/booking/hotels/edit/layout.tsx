import type { ReactNode } from "react";
import FormDialog from "@/app/_components/FormDialog";

export default function Layout({ children }: { children: ReactNode }) {
  return <FormDialog title="Modifier · Établissement" fallback="/booking/hotels/list?page=1">{children}</FormDialog>;
}
