"use client";

import { User } from "@/app/lib/types";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ChevronDown, Plus, Search } from "lucide-react";
import { CiTrash } from "react-icons/ci";
import { ProductImage, SelectSearchItem } from "../../products/_components";
import { useState } from "react";
import NewSubCategoryDialog from "./NewSubCategoryDialog";

type Props = {
  // selectedUser: User | undefined;
  // setSelectedUser: (val: User) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const SubCategorySelect = ({
  // setSelectedUser,
  setOpen,
  open,
}: // selectedUser,
Props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col space-y-2 mt-6"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm font-bold">Sous catégorie</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner les sous catégorie"
              // value={selectedUser?.fullName ?? ""}
              onChange={() => {}}
            >
              <TextField.Slot>
                <ChevronDown size={15} />
              </TextField.Slot>
            </TextField.Root>
            <div className="inset-0 absolute hover:cursor-default"></div>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title size="4">Sous catégorie</Dialog.Title>
        <Dialog.Description size="2">
          Sélectionner des sous catégories après recherche
        </Dialog.Description>

        <Flex align="center" gap="2" mt="4">
          <TextField.Root
            value={searchValue}
            placeholder="Rechercher une sous catégorie"
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full"
          >
            <TextField.Slot>
              <Search size={15} />
            </TextField.Slot>
          </TextField.Root>
          <NewSubCategoryDialog />
        </Flex>

        <Flex wrap="wrap" gap="4" mt="4" mb="8">
          {[...Array(10)].map((_, index) => (
            <SelectSearchItem key={index} title="Pantalon" />
          ))}
        </Flex>

        <Flex gap="3" mt="4" justify="between">
          {/* {isPending ? <Text size="1">Chargement...</Text> : <p></p>} */}
          <Dialog.Close>
            <Button>Fermer</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SubCategorySelect;
