"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Badge, Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

type Props = {
  selectedCity: String | undefined;
  setSelectedCity: (val: String) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const HotelCitiesSelect = ({
  setSelectedCity,
  setOpen,
  open,
  selectedCity,
}: Props) => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const handleItemClicked = async (country: String) => {
    setSelectedCity(country);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col space-y-2 mt-6"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm font-bold">Ville</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner le lieu d'expédition"
              // value={selectedExpedition?.name ?? ""}
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

        <div className="min-h-[60px] mt-2">
          <div
          // className={classNames({
          //   "border-b border-gray-200":
          //     index + 1 !== shopExpeditionRegionsResponse?.data.length,
          //   "cursor-default hover:bg-gray-50 py-2": true,
          // })}
          // key={expeditionRegion.id}
          // onClick={() => handleItemClicked(expeditionRegion)}
          >
            <Flex gap="2" align="center">
              <Badge radius="medium" className="uppercase">
                Goma
              </Badge>
            </Flex>
          </div>
        </div>

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

export default HotelCitiesSelect;
