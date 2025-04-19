import { Text } from "@radix-ui/themes";
import { X } from "lucide-react";
import Link from "next/link";
import { IoStorefrontOutline } from "react-icons/io5";
import ShopForm from "./_components/ShopForm";

const NewShopPage = () => {
  return (
    <div>
      <div className="mb-2">
        <div className="flex cursor-pointer items-center justify-center bg-white border border-gray-200 rounded-full h-10 w-10 mb-5">
          <Link href="/market/shops">
            <X />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <IoStorefrontOutline />
          <span className="font-bold">Boutique</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour créer une nouvelle boutique
        </Text>
      </div>

      <ShopForm />
    </div>
  );
};

export default NewShopPage;
