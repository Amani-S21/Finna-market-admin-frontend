import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/categories/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Catégorie" fallback="/market/categories/list?page=1"><Page /></FormDialog>;
}
