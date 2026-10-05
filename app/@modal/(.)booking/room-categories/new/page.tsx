import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/booking/room-categories/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Catégorie de chambre" fallback="/booking/room-categories/list?page=1"><Page /></FormDialog>;
}
