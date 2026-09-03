"use client";

import { ErrorMessage, Spinner } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useCreateShopTaxes,
  useShopTaxForm,
  useUpdateShopTaxes,
} from "../_features/hooks";
import {
  ShopTaxSchema,
  TaxePriceData,
  TaxePriceSubmit,
} from "../_features/types";
import SearchTaxInput from "./SearchTaxeInput";

const ShopTaxeForm = ({ tax }: { tax?: TaxePriceData }) => {
  
  const axios = useAxiosAuth();
  const [selectedTaxPriceId, setSelectedTaxPriceId] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useShopTaxForm({taxName : tax?.taxe.name});

  const { mutateAsync: createTaxPriceMutation, error: createError } =
    useCreateShopTaxes({ axios });

  const { mutateAsync: patchTaxpriceMutation, error: updateError } =
    useUpdateShopTaxes({ axios });

  const onSubmit = async (data: ShopTaxSchema) => {
    if (tax) {
      const dataSubmit: TaxePriceSubmit = {
        shopId: tax.shopId,
        taxeId: selectedTaxPriceId,
        price: parseInt(`${data.price}`),
      };
      try {
        await patchTaxpriceMutation(dataSubmit, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shop-taxe"] });
            queryClient.invalidateQueries({ queryKey: ["shop-taxes"] });
            toast.success("Pourcentage modifié");
            router.back();
          },
        });
      } finally {}
    } else {
      const dataSubmit: TaxePriceSubmit = {
        shopId: `43599fb2-2b3c-4075-8531-8c6ccdc0a5d1`, // Finna shop id
        taxeId: selectedTaxPriceId,
        price: parseInt(`${data.price}`),
      };
      try {
        await createTaxPriceMutation(dataSubmit, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["shop-taxe"] });
            queryClient.invalidateQueries({ queryKey: ["shop-taxes"] });
            toast.success("Pourcentage ajouté");
            router.back();
          },
        });
      } finally {
      }
    }
  };

  useEffect(() => {
    if (tax) {
      setSelectedTaxPriceId(tax.taxeId);
    }
  }, [tax]);

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
            defaultValue={tax?.price}
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting} mt="2">
          {tax ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ShopTaxeForm;
