import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/places/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Place" fallback="/transport/places/list?page=1"><Page /></FormDialog>;
}
