import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const VehicleTypeToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Types d'engins</span>
        </div>
        <Text as="p" size="2">
          Touts les types d'engins disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/transport/vehicle-types/new">
        <Button>
          <span className="text-xs">Nouvel engin</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default VehicleTypeToolBar;
