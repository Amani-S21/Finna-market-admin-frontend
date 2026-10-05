import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/shop-taxes/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Taxe de boutique" fallback="/market/shop-taxes/list?page=1"><Page /></FormDialog>;
}
