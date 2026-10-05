import PageToolbar from "@/app/_components/PageToolbar";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const PlacesToolBar = () => {
  return (
    <PageToolbar icon={<IoStorefrontOutline />} title="Places" description="Toutes les places disponibles dans l'entreprise">

      <Link href="/transport/places/new">
        <Button>
          <span className="text-xs">Nouvelle place</span>
        </Button>
      </Link>
    </PageToolbar>
  );
};

export default PlacesToolBar;
