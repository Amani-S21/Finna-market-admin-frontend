import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const VehicleTypeToolBar = () => {
  return (
    <PageToolbar icon={<IoStorefrontOutline />} title="Types d'engins" description="Touts les types d'engins disponibles dans l'entreprise">

      <Link href="/transport/vehicle-types/new">
        <Button>
          <span className="text-xs">Nouvel engin</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default VehicleTypeToolBar;
