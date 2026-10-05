import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/categories/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Catégorie" fallback="/market/categories/list?page=1"><Page /></FormDialog>;
}
