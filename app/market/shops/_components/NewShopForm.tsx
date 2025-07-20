"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import axios from "@/app/lib/axios";
import { Category, NewShopSchema, User } from "@/app/lib/types";
import { newShopSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Flex, TextArea, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ShopType } from "../../orders/_features/types";
import { useCreateShop } from "../_features/hooks";
import { ExpeditionRegion } from "../_features/types";
import ShopCategorySelect from "./ShopCategorySelect";
import ShopExpeditionRegionsSelect from "./ShopExpeditionSelect";
import ShopOwnerSelect from "./ShopOwnerSelect";
import ShopTypeSelect from "./ShopTypeSelect";

const NewShopForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedShopType, setSelectedshopType] = useState<ShopType>();

  const [openDialog, setOpenDialog] = useState(false);

  const [selectedShopCategories, setSelectedShopCategories] =
    useState<Category[]>();

  const [selectedUser, setSelectedUser] = useState<User>();
  const [openOwnerDialog, setOpenOwnerDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const [selectedExpedition, setSelectedExpedition] =
    useState<ExpeditionRegion>();
  const [openExpeditionDialog, setOpenExpeditionDialog] = useState(false);

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
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-bold">Phone</p>
                <TextField.Root
                  // {...register("name")}
                  placeholder="Entrer le numero de téléphone"
                />
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
              </div>

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

              <ShopExpeditionRegionsSelect
                setSelectedExpeditionRegion={setSelectedExpedition}
                selectedExpedition={selectedExpedition}
                open={openExpeditionDialog}
                setOpen={setOpenExpeditionDialog}
              />
            </div>
            <ShopCategorySelect
              open={openCategoryDialog}
              setOpen={setOpenCategoryDialog}
              selectedShopCategories={selectedShopCategories}
              setSelectedShopCategories={setSelectedShopCategories}
            />
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
