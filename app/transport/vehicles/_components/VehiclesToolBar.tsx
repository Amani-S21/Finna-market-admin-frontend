import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const VehiclesToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Véhicules</span>
        </div>
        <Text as="p" size="2">
          Tous les vehicules disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/transport/agencies/new">
        <Button>
          <span className="text-xs">Nouveau vehicule</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default VehiclesToolBar;
