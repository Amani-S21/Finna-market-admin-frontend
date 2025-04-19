import ErrorMessage from "@/app/_components/ErrorMessage";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  Button,
  IconButton,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React from "react";
import { IoArrowBackCircleOutline, IoStorefrontOutline } from "react-icons/io5";
import { X } from "lucide-react";
import Link from "next/link";

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

      <form className="max-w-xl">
        <div className="flex flex-col space-y-2 mt-6">
          <p className="text-sm font-bold">Boutique</p>
          <TextField.Root placeholder="Nom de la boutique"></TextField.Root>
          {/* <ErrorMessage>{errors.phone?.message}</ErrorMessage> */}
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Addrèsse</p>
          <TextArea placeholder="Addrèsse de la boutique"></TextArea>
          {/* <ErrorMessage>{errors.phone?.message}</ErrorMessage> */}
        </div>
        <Button mt="4">Enregistrer</Button>
      </form>
    </div>
  );
};

export default NewShopPage;
