import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import Link from "next/link";

const TaxesToolBar = () => {
  return (
    <PageToolbar icon={<DollarSign size={18} />} title="Taxes" description="Toutes les taxes déjà créée dans l'entreprise">

      <Link href="/market/shop-taxes/new">
        <Button>
          <span className="text-xs">Nouveau pourcentage</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default TaxesToolBar;
