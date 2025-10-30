"use client";

import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Country } from "../_features/types";

type Props = {
  selectedCountry: Country | undefined;
  setSelectedCountry: (val: Country) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const HotelCountriesSelect = ({
  setSelectedCountry,
  setOpen,
  open,
  selectedCountry,
}: Props) => {
  
  const [countries, setCountries] = useState<Country[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const handleItemClicked = (country: Country) => {
    setSelectedCountry(country);
    setOpen(false);
  };

  useEffect(() => {
    fetch("/data/world_countries.json")
      .then((res) => res.json())
      .then((data) => setCountries(data.countries))
      .catch((err) => console.error("Error loading countries:", err));
  }, []);

  // ✅ Filter countries when searching
  const filteredCountries = countries.filter((c) =>
    c.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col space-y-2 mt-6"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm font-bold">Pays</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner le pays"
              value={selectedCountry?.name ?? ""}
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
        <Dialog.Title size="4">Séléctionner un pays</Dialog.Title>
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

        <div className="max-h-60 overflow-y-auto space-y-2 mt-4">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <div
                key={country.code}
                className="p-2 rounded hover:bg-gray-100 flex items-center justify-between cursor-pointer"
                onClick={() => handleItemClicked(country)}
              >
                <span>
                  {country.flag} {country.name}
                </span>
                <span className="text-sm text-gray-500 uppercase">
                  {country.accronym}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center">
              Aucun pays trouvé
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

export default HotelCountriesSelect;
