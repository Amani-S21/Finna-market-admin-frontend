"use client";

import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Badge, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { ShopType } from "../../orders/_features/types";
import { useSearchUser } from "../../users/_features/hooks";
import { User } from "@/app/lib/types";

type Props = {
  selectedUser: User | undefined;
  setSelectedUser: (val: User) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
};

const ShopOwnerSelect = ({
  setSelectedUser,
  setOpen,
  open,
  selectedUser,
}: Props) => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: searchedUsers, isLoading: isLoadingUsers } = useSearchUser({
    axios,
    term: debouncedSearchTerm,
    enabled: !!debouncedSearchTerm,
  });

  const handleItemClicked = async (user: User) => {
    setSelectedUser(user);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div
          className="flex flex-col space-y-2 mt-6"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm font-bold">Propriétaire</p>
          <div className="relative">
            <TextField.Root
              placeholder="Sélectionner un utilisateur"
              value={selectedUser?.fullName ?? ""}
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
        <Dialog.Title size="4">Séléctionner le proprétaire</Dialog.Title>
        <Dialog.Description size="1">
          Vous pouvez séléctionner le proprétaire après recherche
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

        {isLoadingUsers ? (
          <div className="min-h-[60px]">
            <Text size="1" mt="4">
              Chargement...
            </Text>
          </div>
        ) : (searchedUsers ?? []).length > 0 ? (
          <div className="min-h-[60px] mt-2">
            {searchedUsers?.map((user, index) => (
              <div
                className={classNames({
                  "border-b border-gray-200":
                    index + 1 !== searchedUsers.length,
                  "cursor-default hover:bg-gray-50 py-2": true,
                })}
                key={user.id}
                onClick={() => handleItemClicked(user)}
              >
                <Flex gap="2" align="center">
                  <Badge radius="medium" className="uppercase">
                    {user.fullName?.substring(0, 1)}
                  </Badge>
                  <p>{user.fullName}</p>
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

export default ShopOwnerSelect;
