import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { TbCategoryMinus } from "react-icons/tb";

const RoomCategoriesToolBar = () => {
  return (
    <PageToolbar icon={<TbCategoryMinus />} title="Catégories" description="Toutes les catégories disponibles dans l'entreprise">

      <Link href="/booking/room-categories/new">
        <Button>
          <span className="text-xs">Nouvelle catégorie</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default RoomCategoriesToolBar;
