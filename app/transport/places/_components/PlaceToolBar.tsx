import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoStorefrontOutline } from "react-icons/io5";

const PlacesToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Places</span>
        </div>
        <Text as="p" size="2">
          Toutes les places disponibles dans l'entreprise
        </Text>
      </div>

      <Link href="/transport/places/new">
        <Button>
          <span className="text-xs">Nouvelle place</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default PlacesToolBar;
