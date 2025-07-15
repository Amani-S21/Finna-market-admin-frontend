"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { CategorySchema, Taxe } from "@/app/lib/types";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  useCreateTaxes,
  useTaxeForm,
  useUpdateTaxes,
} from "../_features/hooks";

const TaxeForm = ({ taxe }: { taxe?: Taxe }) => {
  const axios = useAxiosAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    resetField,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useTaxeForm();

  const {
    mutateAsync: createTaxe,
    error: createError,
    isSuccess: isCreateSuccess,
  } = useCreateTaxes({
    axios,
  });

  const {
    mutateAsync: updateTaxe,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateTaxes({ axios });

  const onSubmit = async (data: CategorySchema) => {
    if (taxe) {
      try {
        await updateTaxe(
          {
            id: taxe.id,
            name: data.name,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["taxes"] });
              queryClient.invalidateQueries({ queryKey: ["taxe"] });
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
            name: data.name,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["taxes"] });
              queryClient.invalidateQueries({ queryKey: ["taxe"] });
              toast.success(`Taxe crééee avec avec succèes`);
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
            defaultValue={taxe?.name}
            placeholder="Nom de la caractéristique"
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

export default TaxeForm;
