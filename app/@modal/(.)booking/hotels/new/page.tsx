import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/booking/hotels/new/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Ajouter · Établissement" fallback="/booking/hotels/list?page=1"><Page /></FormDialog>;
}
