"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Product } from "@/app/lib/types";
import { Badge, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { useSearchGlobalProduct } from "../../users/_features/hooks";

type Props = {
  selectedProduct: Product | undefined;
  setSelectedProduct: (val: Product) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ProductSelect = ({
  setSelectedProduct,
  setOpen,
  open,
  selectedProduct,
}: Props) => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: searchedProducts, isLoading: isLoading } =
    useSearchGlobalProduct({
      axios,
      term: debouncedSearchTerm,
      enabled: !!debouncedSearchTerm,
    });

  const handleItemClicked = async (product: Product) => {
    setSelectedProduct(product);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col space-y-2 mt-4"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm font-bold">Produit</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner un produit"
              value={selectedProduct?.name ?? ""}
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
        <Dialog.Title size="4">Séléctionner un produit</Dialog.Title>
        <Dialog.Description size="1">
          Vous pouvez séléctionner un produit après recherche
        </Dialog.Description>

        <TextField.Root
          value={searchValue}
          placeholder="Rechercher un produit"
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
        ) : (searchedProducts ?? []).length > 0 ? (
          <div className="min-h-[60px] mt-2">
            {searchedProducts?.map((product, index) => (
              <div
                className={classNames({
                  "border-b border-gray-200":
                    index + 1 !== searchedProducts.length,
                  "cursor-default hover:bg-gray-50 py-2": true,
                })}
                key={product.id}
                onClick={() => handleItemClicked(product)}
              >
                <Flex gap="2" align="center">
                  <Badge radius="medium" className="uppercase">
                    {product.name?.substring(0, 1)}
                  </Badge>
                  <p>{product.name}</p>
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

export default ProductSelect;
