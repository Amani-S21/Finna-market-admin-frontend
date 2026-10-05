import PageToolbar from "@/app/_components/PageToolbar";
import { TbCategoryMinus } from "react-icons/tb";

const RoomBookingToolBar = () => {
  return (
    <PageToolbar icon={<TbCategoryMinus />} title="Réservations" description="Toutes les réservations disponibles">

    </PageToolbar>
  );
};

export default RoomBookingToolBar;
