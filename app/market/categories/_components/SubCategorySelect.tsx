"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SelectSearchItem } from "../../products/_components";
import { useSearchSubCategories } from "../_features/hooks";
import NewSubCategoryDialog from "./NewSubCategoryDialog";
import { addSubCategory } from "@/redux/features/categorySlice";

const SubCategorySelect = () => {
  const axios = useAxiosAuth();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: dataResponse, isLoading } = useSearchSubCategories({
    axios,
    term: debouncedSearchTerm,
    enabled: !!debouncedSearchTerm,
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="flex flex-col space-y-2 mt-6">
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
          <NewSubCategoryDialog
            setOpen={setOpenSubCategoryDialog}
            open={openSubCategoryDialog}
          />
        </Flex>

        {isLoading ? (
          <Text>Chargement...</Text>
        ) : (
          <Flex wrap="wrap" gap="4" mt="4" mb="8">
            {dataResponse?.data.map((subCategory, index) => (
              <SelectSearchItem
                key={index}
                title={`${subCategory.name}`}
                
                onClick={() => {
                  dispatch(
                    addSubCategory({
                      id: `${subCategory.id}`,
                      index: dataResponse?.data?.length,
                      name: `${subCategory.name}`,
                    })
                  );
                }}
              />
            ))}
          </Flex>
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

export default SubCategorySelect;
