import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/profile/password/edit/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier le mot de passe" fallback="/profile/details"><Page /></FormDialog>;
}
