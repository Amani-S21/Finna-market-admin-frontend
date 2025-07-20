"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Badge, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { ShopType } from "../../orders/_features/types";
import { useSearchExpeditionRegions } from "../_features/hooks";
import { ExpeditionRegion } from "../_features/types";

type Props = {
  selectedExpedition: ExpeditionRegion | undefined;
  setSelectedExpeditionRegion: (val: ExpeditionRegion) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ShopExpeditionRegionsSelect = ({
  setSelectedExpeditionRegion,
  setOpen,
  open,
  selectedExpedition,
}: Props) => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: shopExpeditionRegionsResponse, isLoading: isLoadingTypes } =
    useSearchExpeditionRegions({
      axios,
      term: debouncedSearchTerm,
      enabled: !!debouncedSearchTerm,
    });

  const handleItemClicked = async (shopType: ShopType) => {
    setSelectedExpeditionRegion(shopType);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className="flex flex-col space-y-2 mt-6" onClick={() => setOpen(true)}>
          <p className="text-sm font-bold">Lieu d'expédition</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner le lieu d'expédition"
              value={selectedExpedition?.name ?? ""}
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
        <Dialog.Title size="4">Séléctionner un type</Dialog.Title>
        <Dialog.Description size="1">
          Vous pouvez séléctionner un type après recherche
        </Dialog.Description>

        <TextField.Root
          value={searchValue}
          placeholder="Ce champs est obligatoire"
          onChange={(e) => setSearchValue(e.target.value)}
          mt="6"
        >
          <TextField.Slot>
            <Search size={15} />
          </TextField.Slot>
        </TextField.Root>

        {isLoadingTypes ? (
          <div className="min-h-[60px]">
            <Text size="1" mt="4">
              Chargement...
            </Text>
          </div>
        ) : (shopExpeditionRegionsResponse?.data ?? []).length > 0 ? (
          <div className="min-h-[60px] mt-2">
            {shopExpeditionRegionsResponse?.data?.map(
              (expeditionRegion, index) => (
                <div
                  className={classNames({
                    "border-b border-gray-200":
                      index + 1 !== shopExpeditionRegionsResponse?.data.length,
                    "cursor-default hover:bg-gray-50 py-2": true,
                  })}
                  key={expeditionRegion.id}
                  onClick={() => handleItemClicked(expeditionRegion)}
                >
                  <Flex gap="2" align="center">
                    <Badge radius="medium" className="uppercase">
                      {expeditionRegion.name?.substring(0, 1)}
                    </Badge>
                    <p>{expeditionRegion.name}</p>
                  </Flex>
                </div>
              )
            )}
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

export default ShopExpeditionRegionsSelect;
