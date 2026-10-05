import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/products/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Produit" fallback="/market/products/list?page=1"><Page /></FormDialog>;
}
