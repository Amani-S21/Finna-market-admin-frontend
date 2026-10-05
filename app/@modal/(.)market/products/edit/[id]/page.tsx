import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/products/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Produit" fallback="/market/products/list?page=1"><Page /></FormDialog>;
}
