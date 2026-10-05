import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/profile/edit/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier mon profil" fallback="/profile/details"><Page /></FormDialog>;
}
