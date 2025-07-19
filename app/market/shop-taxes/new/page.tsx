import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import React from "react";
import { ShopTaxeForm } from "../_components";

const ShopTaxesPage = () => {
  return (
    <div className="max-w-xl">
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <DollarSign size={18} />
          <span className="font-bold">Taxe</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer un nouveau pourcentage de
          la taxe
        </Text>
      </div>

      <ShopTaxeForm />
    </div>
  );
};

export default ShopTaxesPage;
