"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Category } from "@/app/lib/types";
import { Badge, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useSearchCategories } from "../../categories/_features/hooks";
import { SelectSearchItem } from "../../products/_components";

type Props = {
  selectedShopCategories: Category[] | undefined;
  setSelectedShopCategories: React.Dispatch<
    React.SetStateAction<Category[] | undefined>
  >;
  open: boolean;
  setOpen: (val: boolean) => void;
  onDeleteClick: (category: Category) => void
};

const ShopCategorySelect = ({
  setSelectedShopCategories,
  selectedShopCategories,
  setOpen,
  open,
  onDeleteClick
}: Props) => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: categoriesResponse, isLoading: isLoadingTypes } =
    useSearchCategories({
      axios,
      term: debouncedSearchTerm,
      enabled: !!debouncedSearchTerm,
    });

  const handleItemClicked = (category: Category) => {
    setSelectedShopCategories((prev) => {
      // If prev is undefined, start a new array
      const updated = prev ? [...prev] : [];

      // Avoid duplicates (optional)
      const alreadySelected = updated.some((c) => c.id === category.id);
      if (!alreadySelected) {
        updated.push(category);
      }

      return updated;
    });
  };


  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col space-y-2 mt-6"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm font-bold">Catégories de la boutique</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner le type"
              value={""}
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
        <Dialog.Title size="4">Séléctionner des catégories</Dialog.Title>
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
        ) : (categoriesResponse?.data ?? []).length > 0 ? (
          <div className="min-h-[60px] mt-2">
            {categoriesResponse?.data?.map((category, index) => (
              <div
                className={classNames({
                  "border-b border-gray-200":
                    index + 1 !== categoriesResponse?.data.length,
                  "cursor-default hover:bg-gray-50 py-2": true,
                })}
                key={category.id}
                onClick={() => handleItemClicked(category)}
              >
                <Flex gap="2" align="center">
                  <Badge radius="medium" className="uppercase">
                    {category.name?.substring(0, 1)}
                  </Badge>
                  <p>{category.name}</p>
                </Flex>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-h-[60px]">
            <Text size="1" mt="4" as="p">
              Aucun élément
            </Text>
          </div>
        )}

        <Text size="1" mt="6" mb="3" as="p">
          Catégories séléctionnée
        </Text>
        <Flex mt="2" gap="4" wrap="wrap">
          {(selectedShopCategories ?? []).map((category, index) => (
            <SelectSearchItem
              key={index}
              id={category.id}
              title={category.name}
              index={`${index}`}
              editable={false}
              onDeleteClick={() => onDeleteClick(category)}
            />
          ))}
        </Flex>

        <Flex gap="3" mt="8" justify="between">
          {/* {isPending ? <Text size="1">Chargement...</Text> : <p></p>} */}
          <Dialog.Close>
            <Button variant="surface" color="gray">
              Fermer
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ShopCategorySelect;
