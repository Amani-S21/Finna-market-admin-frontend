import FormDialog from "@/app/_components/FormDialog";
import Page from "@/app/booking/hotels/edit/[id]/page";

export default function ModalPage() {
  return <FormDialog intercepted title="Modifier · Établissement" fallback="/booking/hotels/list?page=1"><Page /></FormDialog>;
}
