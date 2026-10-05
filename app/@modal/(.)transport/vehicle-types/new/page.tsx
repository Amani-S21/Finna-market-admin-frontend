import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/vehicle-types/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Type d’engin" fallback="/transport/vehicle-types/list?page=1"><Page /></FormDialog>;
}
