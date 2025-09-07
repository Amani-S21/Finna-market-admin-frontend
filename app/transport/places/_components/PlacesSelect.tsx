"use client";

import { Badge, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import classNames from "classnames";
import { PlaceType } from "../_features/types";
import { useSearchPlaces } from "../_features/hooks";

type Props = {
  selectedPlace: PlaceType | undefined;
  setSelectedPlace: (val: PlaceType) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const PlaceSelect = ({
  setSelectedPlace,
  setOpen,
  open,
  selectedPlace,
}: Props) => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: vehicleTypeResponse, isLoading: isLoadingTypes } =
    useSearchPlaces({
      axios,
      term: debouncedSearchTerm,
      enabled: !!debouncedSearchTerm,
    });

  const handleItemClicked = async (placeType: PlaceType) => {
    setSelectedPlace(placeType);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col"
          onClick={() => setOpen(true)}
        >
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner le type"
              value={selectedPlace?.name ?? ""}
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
        <Dialog.Title size="4">Séléctionner un type de vehicule</Dialog.Title>
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
        ) : (vehicleTypeResponse ?? []).length > 0 ? (
          <div className="min-h-[60px] mt-2">
            {vehicleTypeResponse?.map((vehicleType, index) => (
              <div
                className={classNames({
                  "border-b border-gray-200":
                    index + 1 !== vehicleTypeResponse.length,
                  "cursor-default hover:bg-gray-50 py-2": true,
                })}
                key={vehicleType.id}
                onClick={() => handleItemClicked(vehicleType)}
              >
                <Flex gap="2" align="center">
                  <Badge radius="medium" className="uppercase">
                    {vehicleType.name?.substring(0, 1)}
                  </Badge>
                  <p>{vehicleType.name}</p>
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

export default PlaceSelect;
