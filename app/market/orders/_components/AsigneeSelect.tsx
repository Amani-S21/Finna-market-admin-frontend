import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import {
  Badge,
  Button,
  Dialog,
  Flex,
  IconButton,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchUser } from "../../users/_features/hooks";
import { useState } from "react";
import { useDebounce } from "@/app/lib/hooks/otherHooks";
import { Spinner } from "@/app/_components";
import { MdOutlineEdit } from "react-icons/md";
import classNames from "classnames";

const AsigneeSelect = () => {
  const axios = useAxiosAuth();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const {
    data: searchedUsers,
    isLoading,
  } = useSearchUser({
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

  // return (
  //   <Select.Root>
  //     <Select.Trigger placeholder="Assigner livreur" />
  //     <Select.Content>
  //       <Select.Group>
  //         <TextField.Root
  //           placeholder="Rechercher"
  //           value={searchValue ?? "gfgfggf"}
  //           onChange={(e) => setSearchValue(e.target.value)}
  //         >
  //           <TextField.Slot>
  //             <Search size={15} />
  //           </TextField.Slot>
  //         </TextField.Root>
  //         {(searchedUsers ?? []).length > 0 ? (
  //           <>
  //             <Select.Label>Livreurs</Select.Label>
  //             {isLoading ? (
  //               <Spinner />
  //             ) : (
  //               searchedUsers?.map((user) => (
  //                 <p key={user.id} value={user.id}>
  //                   {user.fullName}
  //                 </Select.Item>
  //               ))
  //             )}
  //           </>
  //         ) : (
  //           <>
  //             <Select.Label>Livreurs</Select.Label>
  //             <Select.Item value="value">Aucun élément</Select.Item>
  //           </>
  //         )}
  //       </Select.Group>
  //     </Select.Content>
  //   </Select.Root>
  // );
};

export default AsigneeSelect;
