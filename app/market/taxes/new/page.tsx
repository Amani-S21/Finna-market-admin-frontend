import { BackButton } from "@/app/_components";
import { Text } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import React from "react";
import { TaxeForm } from "../_components";

const NewTaxePage = () => {
  return (
    <>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <DollarSign size={18} />
          <span className="font-bold">Taxe</span>
        </div>
        <Text as="p" size="2" mb="4">
          Vous pouvez enregistrer une nouvelle taxe
        </Text>
      </div>

      <TaxeForm />
    </>
  );
};

export default NewTaxePage;
