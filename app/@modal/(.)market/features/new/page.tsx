import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/features/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Caractéristique" fallback="/market/features/list?page=1"><Page /></FormDialog>;
}
