import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/sub-categories/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Sous-catégorie" fallback="/market/sub-categories/list?page=1"><Page /></FormDialog>;
}
