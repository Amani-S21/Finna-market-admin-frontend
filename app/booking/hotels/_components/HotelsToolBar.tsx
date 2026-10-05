import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { TbCategoryMinus } from "react-icons/tb";

const HotelsToolBar = () => {
  return (
    <PageToolbar icon={<TbCategoryMinus />} title="Entréprises" description="Toutes les entreprise disponibles">

      <Link href="/booking/hotels/new">
        <Button>
          <span className="text-xs">Nouvel entréprise</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default HotelsToolBar;
