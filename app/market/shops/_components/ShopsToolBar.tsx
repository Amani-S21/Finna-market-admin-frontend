import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const ShopsToolBar = () => {
  return (
    <PageToolbar icon={<IoStorefrontOutline />} title="Boutiques" description="Toutes les boutiques disponibles dans l'entreprise">

      <Link href="/market/shops/new">
        <Button>
          <span className="text-xs">Nouvelle Boutique</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default ShopsToolBar;
