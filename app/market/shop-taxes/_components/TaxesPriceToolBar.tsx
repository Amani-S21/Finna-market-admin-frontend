import { Button, Flex, Text } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";
import Link from "next/link";

const TaxesToolBar = () => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <DollarSign size={18} />
          <span className="font-bold">Taxes</span>
        </div>
        <Text as="p" size="2">
          Toutes les taxes déjà créée dans l'entreprise
        </Text>
      </div>

      <Link href="/market/taxes/new">
        <Button>
          <span className="text-xs">Nouvelle taxe</span>
        </Button>
      </Link>
    </Flex>
  );
};

export default TaxesToolBar;
