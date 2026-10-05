import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/market/users/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Utilisateur" fallback="/market/users/list?page=1"><Page /></FormDialog>;
}
