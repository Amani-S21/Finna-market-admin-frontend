"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import { ShopSchema } from "@/app/lib/types";
import { shopSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, TextArea, Button, Spinner } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SearUserTextField from "./SearchUserField";

const ShopForm = () => {
  const [userId, setUserId] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopSchema>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      userName: "",
    },
  });

  const onSubmit = (data: ShopSchema) => {
    console.log(userId);
    console.log(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
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
          placeholder="Nom de la boutique"
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Addrèsse</p>
        <TextArea
          {...register("address")}
          placeholder="Addrèsse de la boutique"
        />
        <ErrorMessage>{errors.address?.message}</ErrorMessage>
      </div>
      <Button disabled={isSubmitting} mt="4">
        Enregistrer {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default ShopForm;
