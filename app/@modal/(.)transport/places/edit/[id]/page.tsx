import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/places/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Place" fallback="/transport/places/list?page=1"><Page /></FormDialog>;
}
