import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/features/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Caractéristique" fallback="/market/features/list?page=1"><Page /></FormDialog>;
}
