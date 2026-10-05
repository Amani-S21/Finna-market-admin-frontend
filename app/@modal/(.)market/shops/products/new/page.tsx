import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/shops/products/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Produit" fallback="/market/shops/list?page=1"><Page /></FormDialog>;
}
