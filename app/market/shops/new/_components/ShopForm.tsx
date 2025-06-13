"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import axios from "@/app/lib/axios";
import { Shop, ShopSchema } from "@/app/lib/types";
import { shopSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SearUserTextField from "./SearchUserField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateShop, useUpdateShop } from "../../_features/hooks";
import { Spinner } from "@/app/_components";

const ShopForm = ({ shop }: { shop?: Shop }) => {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopSchema>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      userName: shop?.users.fullName ?? "",
    },
  });

  const {
    mutateAsync: createShop,
    isSuccess: isCreateSuccess,
    error: createError,
  } = useCreateShop({ axios });

  const {
    mutateAsync: updateShop,
    isSuccess: isUpdateSuccess,
    error: updateError,
  } = useUpdateShop({ axios });

  const onSubmit = async (data: ShopSchema) => {
    if (shop) {
      try {
        await updateShop({ id: shop.id, userId, ...data });
          } catch (error : any) {
      toast.error(JSON.stringify(error))
    }
    } else {
      try {
        await createShop({ userId, ...data });
          } catch (error : any) {
      toast.error(JSON.stringify(error))
    }
    }
  };

  useEffect(() => {
    if (shop) setUserId(shop?.users.id ?? "");
  }, [shop]);

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success(`Boutique créé avec avec succès`);
      router.back();
    }
  }, [isCreateSuccess, router]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(`Boutique modifiée avec avec succès`);
      router.back();
    }
  }, [isUpdateSuccess, router]);

  return (
    <div className="max-w-xl">
      {createError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{createError?.message}</Callout.Text>
        </Callout.Root>
      )}
      {updateError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{updateError?.message}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="userName"
          render={({ field }) => (
            <div className="flex flex-col space-y-2 mt-6">
              <p className="text-sm font-bold">Propriétaire</p>
              <SearUserTextField {...field} setSelectedId={setUserId} />
              <ErrorMessage>{errors.userName?.message}</ErrorMessage>
            </div>
          )}
        />
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nom</p>
          <TextField.Root
            {...register("name")}
            defaultValue={shop?.name}
            placeholder="Nom de la boutique"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Addrèsse</p>
          <TextArea
            {...register("address")}
            rows={6}
            defaultValue={shop?.address}
            placeholder="Addrèsse de la boutique"
          />
          <ErrorMessage>{errors.address?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting} mt="4">
          {shop ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ShopForm;
