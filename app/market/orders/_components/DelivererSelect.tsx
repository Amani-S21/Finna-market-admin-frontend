import { useDebounce } from "@/app/lib/hooks/otherHooks";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Badge, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useSearchUser } from "../../users/_features/hooks";

const DelivererSelect = () => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const { data: searchedUsers, isLoading } = useSearchUser({
    axios,
    term: debouncedSearchTerm,
    role: "CUSTOMER",
    enabled: !!debouncedSearchTerm, // status === "authenticated",
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <MdOutlineEdit /> Séléctionner un livreur
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title size="4">Séléctionner un livreur</Dialog.Title>
        <Dialog.Description size="1">
          Vous pouvez séléctionner un livreur après recherche
        </Dialog.Description>

        <TextField.Root
          value={searchValue}
          placeholder="Ce champs est obligatoire"
          onChange={(e) => setSearchValue(e.target.value)}
          mt="6"
        />

        {isLoading ? (
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
              >
                <Flex align="center" justify="between">
                  <Flex gap="2" align="center">
                    <Badge radius="medium" className="uppercase">
                      {user.fullName.substring(0, 1)}
                    </Badge>
                    <p>{user.fullName}</p>
                  </Flex>
                  <Text size="1">Chargement...</Text>
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

        <Flex gap="3" mt="4" justify="end">
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

export default DelivererSelect;
