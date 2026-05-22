"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Category } from "@/app/lib/types";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { Badge, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useSearchCategories } from "../../categories/_features/hooks";

type Props = {
  selectedCategory: Category | undefined;
  setSelectedCategory: (val: Category) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const CategorySelect = ({
  selectedCategory,
  setSelectedCategory,
  open,
  setOpen,
}: Props) => {
  const axios = useAxiosAuth();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: dataResponse, isLoading } = useSearchCategories({
    axios,
    term: debouncedSearchTerm,
    page: 1,
    limit: 20,
    enabled: !!debouncedSearchTerm,
  });

  const handleItemClicked = async (category: Category) => {
    setSelectedCategory(category);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Catégorie</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner une catégorie"
              value={selectedCategory?.name ?? ""}
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
        <Dialog.Title size="4">Catégorie</Dialog.Title>
        <Dialog.Description size="2">
          Sélectionner une catégorie après recherche
        </Dialog.Description>

        <Flex align="center" gap="2" mt="4">
          <TextField.Root
            value={searchValue}
            placeholder="Rechercher une catégorie"
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full"
          >
            <TextField.Slot>
              <Search size={15} />
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        {isLoading ? (
          <Text>Chargement...</Text>
        ) : (dataResponse?.data ?? []).length > 0 ? (
          <div className="min-h-[60px] mt-2">
            {dataResponse?.data?.map((category, index) => (
              <div
                className={classNames({
                  "border-b border-gray-200":
                    index + 1 !== dataResponse.data.length,
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
            <Text size="1" mt="4">
              Aucun élément
            </Text>
          </div>
        )}

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

export default CategorySelect;
