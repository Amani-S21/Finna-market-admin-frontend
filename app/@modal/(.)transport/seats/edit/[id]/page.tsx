import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/seats/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Place de véhicule" fallback="/transport/agencies/list?page=1"><Page /></FormDialog>;
}
