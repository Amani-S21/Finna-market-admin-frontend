import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/agencies/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Agence" fallback="/transport/agencies/list?page=1"><Page /></FormDialog>;
}
