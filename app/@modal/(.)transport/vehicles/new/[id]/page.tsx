import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/vehicles/new/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Véhicule" fallback="/transport/agencies/list?page=1"><Page /></FormDialog>;
}
