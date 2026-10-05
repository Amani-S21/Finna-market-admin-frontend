import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/taxes/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Taxe" fallback="/market/taxes/list?page=1"><Page /></FormDialog>;
}
