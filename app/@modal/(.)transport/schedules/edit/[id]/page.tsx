import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/transport/schedules/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Programme" fallback="/transport/agencies/list?page=1"><Page /></FormDialog>;
}
