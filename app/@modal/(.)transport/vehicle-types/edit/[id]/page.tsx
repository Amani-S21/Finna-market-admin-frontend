import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/vehicle-types/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Type d’engin" fallback="/transport/vehicle-types/list?page=1"><Page /></FormDialog>;
}
