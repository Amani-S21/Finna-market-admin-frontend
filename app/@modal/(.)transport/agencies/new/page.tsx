import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/agencies/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Agence" fallback="/transport/agencies/list?page=1"><Page /></FormDialog>;
}
