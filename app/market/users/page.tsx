import { Text } from "@radix-ui/themes";
import React from "react";
import { GrDeliver } from "react-icons/gr";

const DeliversPage = () => {
  return (
    <div>
      <div className=" flex items-center space-x-4">
        <GrDeliver />
        <span className="font-bold">Livreurs</span>
      </div>
      <Text as="p" size="2">
        Tous les livreurs disponibles dans l'entreprise
      </Text>
    </div>
  );
};

export default DeliversPage;
