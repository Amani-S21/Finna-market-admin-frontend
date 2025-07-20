"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import axios from "@/app/lib/axios";
import { NewShopSchema, User } from "@/app/lib/types";
import { newShopSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Flex, TextArea, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateShop } from "../_features/hooks";
import { IoIosAdd } from "react-icons/io";
import { ChevronDown, ShoppingBag, Type } from "lucide-react";
import ShopTypeSelect from "./ShopTypeSelect";
import { ShopType } from "../../orders/_features/types";
import ShopOwnerSelect from "./ShopOwnerSelect";

const NewShopForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedShopType, setSelectedshopType] = useState<ShopType>();
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User>();
  const [openOwnerDialog, setOpenOwnerDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewShopSchema>({
    resolver: zodResolver(newShopSchema),
  });

  const {
    mutateAsync: createShop,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useCreateShop({ axios });

  const onSubmit = async (data: NewShopSchema) => {
    try {
      await createShop({
        creatorId: session?.data.id,
        ...data,
      });
    } catch (error: any) {
      toast.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success(`Boutique créé avec avec succès`);
      router.back();
    }
  }, [isCreateSuccess, router]);

  return (
    <div>
      {createError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{createError?.message}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap="6">
          <div className="w-full">
            <div className="flex flex-col space-y-2 mt-4">
              <p className="text-sm font-bold">Nom</p>
              <TextField.Root
                {...register("name")}
                placeholder="Nom de la boutique"
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <p className="text-sm font-bold">National Id</p>
              <TextField.Root
                // {...register("name")}
                placeholder="National Id"
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <p className="text-sm font-bold">RCCM</p>
              <TextField.Root
                // {...register("name")}
                placeholder="Entrer le RCCM"
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <p className="text-sm font-bold">Email address</p>
              <TextField.Root
                // {...register("name")}
                placeholder="Entrer l'address mail"
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <p className="text-sm font-bold">Phone</p>
              <TextField.Root
                // {...register("name")}
                placeholder="Entrer le numero de téléphone"
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col space-y-2 mt-4">
              <p className="text-sm font-bold">Addrèsse</p>
              <TextArea
                {...register("address")}
                rows={3}
                placeholder="Addrèsse"
              />
              <ErrorMessage>{errors.address?.message}</ErrorMessage>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col mt-4">
              <ShopTypeSelect
                setSelectedType={setSelectedshopType}
                selectedShop={selectedShopType}
                open={openDialog}
                setOpen={setOpenDialog}
              />

              <ShopOwnerSelect
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
                open={openOwnerDialog}
                setOpen={setOpenOwnerDialog}
              />

              <div className="flex flex-col space-y-2 mt-6">
                <p className="text-sm font-bold">Lieu d'expédition</p>
                <TextField.Root
                  {...register("expeditionPlaceName")}
                  placeholder="Lieu d'expédition"
                >
                  <TextField.Slot>
                    <ChevronDown size={15} />
                  </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>
                  {errors.expeditionPlaceName?.message}
                </ErrorMessage>
              </div>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <Flex justify="between">
                <p className="text-sm font-bold">Catégories de la boutique</p>
                <Flex
                  align="center"
                  onClick={() => {
                    // dispatch(
                    //   addFeatureValue({
                    //     index: `${featureValues?.length}`,
                    //     value: watch("type") ?? "",
                    //   })
                    // );
                    // resetField("type");
                  }}
                >
                  <IoIosAdd size={20} />
                  <p className="text-sm underline hover:cursor-default">
                    Ajoutrer à la liste
                  </p>
                </Flex>
              </Flex>
              <TextField.Root
                // {...register("type")}
                placeholder="Type de la caractéristique"
              />
            </div>
          </div>
        </Flex>

        <Button disabled={isSubmitting} mt="4">
          Enregistrer {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewShopForm;
