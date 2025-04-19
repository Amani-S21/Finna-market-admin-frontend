"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import { ShopSchema } from "@/app/types";
import { shopSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, TextArea, Button, Spinner } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";

const ShopForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopSchema>({ resolver: zodResolver(shopSchema) });

  const onSubmit = (data: ShopSchema) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
      <div className="flex flex-col space-y-2 mt-6">
        <p className="text-sm font-bold">Nom</p>
        <TextField.Root
          {...register("name")}
          placeholder="Nom de la boutique"
        ></TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <p className="text-sm font-bold">Addrèsse</p>
        <TextArea
          {...register("address")}
          placeholder="Addrèsse de la boutique"
        ></TextArea>
        <ErrorMessage>{errors.address?.message}</ErrorMessage>
      </div>
      <Button disabled={isSubmitting} mt="4">
        Enregistrer {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default ShopForm;
