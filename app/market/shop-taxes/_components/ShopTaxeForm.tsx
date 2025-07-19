"use client";

import React, { useState } from "react";
import SearchTaxInput from "./SearchTaxeInput";
import { ErrorMessage, Spinner } from "@/app/_components";
import { Controller } from "react-hook-form";
import {
  useCreateShopTaxes,
  useShopTaxForm,
  useUpdateShopTaxes,
} from "../_features/hooks";
import { Button, Callout, TextField } from "@radix-ui/themes";
import {
  ShopTaxSchema,
  TaxePriceData,
  TaxePriceSubmit,
} from "../_features/types";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ShopTaxeForm = ({ taxPrice }: { taxPrice: TaxePriceData }) => {
  const { data: session } = useSession();
  const axios = useAxiosAuth();
  const [selectedTaxPriceId, setSelectedTaxPriceId] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useShopTaxForm();

  const { mutateAsync: createTaxPriceMutation, error: createError } =
    useCreateShopTaxes({ axios });

  const { mutateAsync: patchTaxpriceMutation, error: updateError } =
    useUpdateShopTaxes({ axios });

  const onSubmit = async (data: ShopTaxSchema) => {
    if (taxPrice) {
      const dataSubmit: TaxePriceSubmit = {
        shopId: `${session?.data.shopAffectations[0].shopId}`,
        taxeId: selectedTaxPriceId,
        price: parseInt(`${data.price}`),
      };
      await patchTaxpriceMutation(dataSubmit, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["shop-taxe"] });
          queryClient.invalidateQueries({ queryKey: ["shop-taxes"] });
        },
      });
    } else {
      const dataSubmit: TaxePriceSubmit = {
        shopId: `${session?.data.shopAffectations[0].shopId}`,
        taxeId: selectedTaxPriceId,
        price: parseInt(`${data.price}`),
      };
      try {
        await createTaxPriceMutation(dataSubmit, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shop-taxe"] });
            queryClient.invalidateQueries({ queryKey: ["shop-taxes"] });
            toast.success("Nouveau pourcentage ajouté");
            router.back();
          },
        });
      } finally {
      }
    }
  };

  return (
    <div>
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
          name="taxName"
          render={({ field }) => (
            <div className="flex flex-col space-y-2 mt-6">
              <p className="text-sm font-bold">Taxe</p>
              <SearchTaxInput
                {...field}
                setSelectedTaxePriceId={setSelectedTaxPriceId}
              />
              <ErrorMessage>{errors.taxName?.message}</ErrorMessage>
            </div>
          )}
        />

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Pourcentage taxe</p>
          <TextField.Root
            {...register("price")}
            placeholder="Saisissez le prix d'achat"
            defaultValue={taxPrice?.price}
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting} mt="2">
          {taxPrice ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ShopTaxeForm;
