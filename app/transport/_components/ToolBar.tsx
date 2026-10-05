import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const AgenciesToolBar = () => {
  return (
    <PageToolbar icon={<IoStorefrontOutline />} title="Agences" description="Toutes les agences disponibles dans l'entreprise">

      <Link href="/transport/agencies/new">
        <Button>
          <span className="text-xs">Nouvelle Agence</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default AgenciesToolBar;
