import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/vehicles/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Véhicule" fallback="/transport/agencies/list?page=1"><Page /></FormDialog>;
}
