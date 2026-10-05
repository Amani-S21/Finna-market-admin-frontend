import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/schedules/new/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Programme" fallback="/transport/agencies/list?page=1"><Page /></FormDialog>;
}
