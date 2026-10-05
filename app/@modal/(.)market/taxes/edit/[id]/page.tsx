import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/taxes/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Taxe" fallback="/market/taxes/list?page=1"><Page /></FormDialog>;
}
