import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { TbCategoryMinus } from "react-icons/tb";

const SubCategoriesToolBar = () => {
  return (
    <PageToolbar icon={<TbCategoryMinus />} title="Sous catégories" description="Toutes les sous catégories disponibles dans l'entreprise">

      <Link href="/market/sub-categories/new">
        <Button>
          <span className="text-xs">Nouvelle sous catégorie</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default SubCategoriesToolBar;
