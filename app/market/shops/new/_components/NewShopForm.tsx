"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import axios from "@/app/lib/axios";
import { NewShopSchema } from "@/app/lib/types";
import { newShopSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateShop } from "../../_features/hooks";
import SearchUserTextField from "./SearchUserField";

const NewShopForm = () => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const {
    register,
    control,
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
        superMarketOwnerId: userId,
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
    <div className="max-w-xl">
      {createError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{createError?.message}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="userName"
          render={({ field }) => (
            <div className="flex flex-col space-y-2 mt-6">
              <p className="text-sm font-bold">Propriétaire</p>
              <SearchUserTextField {...field} setSelectedId={setUserId} />
              <ErrorMessage>{errors.userName?.message}</ErrorMessage>
            </div>
          )}
        />
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nom</p>
          <TextField.Root
            {...register("name")}
            placeholder="Nom de la boutique"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Addrèsse</p>
          <TextArea
            {...register("address")}
            rows={6}
            placeholder="Addrèsse de la boutique"
          />
          <ErrorMessage>{errors.address?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting} mt="4">
          Enregistrer {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewShopForm;
