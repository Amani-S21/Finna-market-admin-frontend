import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/shops/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Boutique" fallback="/market/shops/list?page=1"><Page /></FormDialog>;
}
