"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useCreateShopTaxes,
  useTaxePriceForm,
  useUpdateShopTaxes,
} from "../_features/hooks";
import { TaxePriceData } from "../_features/types";

const TaxePriceForm = ({ taxe, shopId }: { taxe?: TaxePriceData, shopId : string }) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useTaxePriceForm();

  const {
    mutateAsync: createTaxe,
    error: createError,
  } = useCreateShopTaxes({
    axios,
  });

  const {
    mutateAsync: updateTaxe,
    error: updateError,
  } = useUpdateShopTaxes({ axios });

  const onSubmit = async () => {
    if (taxe) {
      try {
        await updateTaxe(
          {
            shopId : taxe.shopId,
            taxeId : taxe.taxeId,
            price : 0,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["shop-taxes"] });
              queryClient.invalidateQueries({ queryKey: ["shop-taxe"] });
              toast.success(`Taxe modifiée avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createTaxe(
          {
            shopId,
            taxeId : "",
            price : 0,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["shop-taxes"] });
              queryClient.invalidateQueries({ queryKey: ["shop-taxe"] });
              toast.success(`Taxe créée avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

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
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Nom</p>
          <TextField.Root
            {...register("name")}
            defaultValue={taxe?.price}
            placeholder="Nom de la taxe"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting} mt="4">
          {taxe ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TaxePriceForm;
