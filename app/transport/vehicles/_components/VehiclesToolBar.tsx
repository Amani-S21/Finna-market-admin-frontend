import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const VehiclesToolBar = ({ agencyId }: { agencyId: string }) => {
  return (
    <PageToolbar icon={<IoStorefrontOutline />} title="Véhicules" description="Tous les vehicules disponibles dans l'entreprise">

      <Link href={`/transport/vehicles/new/${agencyId}`}>
        <Button>
          <span className="text-xs">Nouveau vehicule</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default VehiclesToolBar;
