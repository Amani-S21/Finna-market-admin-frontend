"use client";

import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Country } from "../_features/types";

type Props = {
  selectedCity: string | undefined;
  setSelectedCity: (val: string) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
  selectedCountry: Country | undefined;
};

const HotelCitiesSelect = ({
  selectedCity,
  setOpen,
  open,
  setSelectedCity,
  selectedCountry,
}: Props) => {
  const [cities, setCities] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (selectedCountry) {
      // ✅ Load cities from selected country
      setCities(selectedCountry.cities || []);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  // ✅ Filter cities when searching
  const filteredCities = cities.filter((city) =>
    city?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleItemClicked = (city: string) => {
    setSelectedCity(city);
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
              placeholder="Sélectionner la vile"
              value={selectedCity ?? ""}
              onChange={(e) => setSearchValue(e.target.value)}
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
        <Dialog.Title size="4">Séléctionner une ville</Dialog.Title>
        <Dialog.Description size="1">
          Vous pouvez séléctionner une ville après recherche
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

        <div className="max-h-60 overflow-y-auto space-y-2 mt-4">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <div
                key={`${index}${city}`}
                className="p-2 rounded hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                onClick={() => handleItemClicked(city)}
              >
                <span className="text-sm text-gray-500 uppercase">{city}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">
              Aucune ville trouvée
            </p>
          )}
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
