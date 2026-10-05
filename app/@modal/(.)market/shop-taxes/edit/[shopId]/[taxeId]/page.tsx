import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/shop-taxes/edit/[shopId]/[taxeId]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Taxe de boutique" fallback="/market/shop-taxes/list?page=1"><Page /></FormDialog>;
}
