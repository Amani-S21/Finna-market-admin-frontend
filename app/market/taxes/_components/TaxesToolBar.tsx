import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import Link from "next/link";

const TaxesToolBar = () => {
  return (
    <PageToolbar icon={<DollarSign size={18} />} title="Taxes" description="Toutes les taxes déjà créée dans l'entreprise">

      <Link href="/market/taxes/new">
        <Button>
          <span className="text-xs">Nouvelle taxe</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default TaxesToolBar;
