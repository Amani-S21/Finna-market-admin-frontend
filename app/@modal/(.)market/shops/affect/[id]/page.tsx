import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/shops/affect/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Affecter · Boutique" fallback="/market/shops/list?page=1"><Page /></FormDialog>;
}
