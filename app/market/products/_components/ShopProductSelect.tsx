"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Shop } from "@/app/lib/types";
import { Badge, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useSearchShop, useSearchUser } from "../../users/_features/hooks";

type Props = {
  selectedShop: Shop | undefined;
  setSelectedShop: (val: Shop) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ShopProductSelect = ({
  setSelectedShop,
  setOpen,
  open,
  selectedShop,
}: Props) => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: searchedShops, isLoading: isLoading } = useSearchShop({
    axios,
    term: debouncedSearchTerm,
    enabled: !!debouncedSearchTerm,
  });

  const handleItemClicked = async (shop: Shop) => {
    setSelectedShop(shop);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col space-y-2 mt-6"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm font-bold">Boutique</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner une boutique"
              value={selectedShop?.name ?? ""}
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
        <Dialog.Title size="4">Séléctionner la boutique</Dialog.Title>
        <Dialog.Description size="1">
          Vous pouvez séléctionner la boutique après recherche
        </Dialog.Description>

        <TextField.Root
          value={searchValue}
          placeholder="Rechercher un utilisateur"
          onChange={(e) => setSearchValue(e.target.value)}
          mt="6"
        >
          <TextField.Slot>
            <Search size={15} />
          </TextField.Slot>
        </TextField.Root>

        {isLoading ? (
          <div className="min-h-[60px]">
            <Text size="1" mt="4">
              Chargement...
            </Text>
          </div>
        ) : (searchedShops ?? []).length > 0 ? (
          <div className="min-h-[60px] mt-2">
            {searchedShops?.map((shop, index) => (
              <div
                className={classNames({
                  "border-b border-gray-200":
                    index + 1 !== searchedShops.length,
                  "cursor-default hover:bg-gray-50 py-2": true,
                })}
                key={shop.id}
                onClick={() => handleItemClicked(shop)}
              >
                <Flex gap="2" align="center">
                  <Badge radius="medium" className="uppercase">
                    {shop.name?.substring(0, 1)}
                  </Badge>
                  <p>{shop.name}</p>
                </Flex>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[60px]">
            <Text size="1" mt="4">
              Aucun élément
            </Text>
          </div>
        )}

        <Flex gap="3" mt="4" justify="between">
          {/* {isPending ? <Text size="1">Chargement...</Text> : <p></p>} */}
          <Dialog.Close>
            <Button variant="surface" color="gray">
              Annuler
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ShopProductSelect;
