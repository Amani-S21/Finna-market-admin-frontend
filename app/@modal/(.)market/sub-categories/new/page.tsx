import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/sub-categories/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Sous-catégorie" fallback="/market/sub-categories/list?page=1"><Page /></FormDialog>;
}
