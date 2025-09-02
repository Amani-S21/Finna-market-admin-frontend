"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreatePlace, useUpdatePlace } from "../_features/hooks";
import { PlaceType } from "../_features/types";
import { newPlaceSchema, NewPlaceSchema } from "../_features/validations";

const PlacesForm = ({ placeType }: { placeType?: PlaceType }) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPlaceSchema>({
    resolver: zodResolver(newPlaceSchema),
  });

  const { mutateAsync: createPlace, error: createError } = useCreatePlace({
    axios,
  });

  // const { mutateAsync: updateCategoryIcon } = useUpdateCategoryIcon({
  //   axios,
  // });

  const { mutateAsync: updatePlace, error: updateError } = useUpdatePlace({
    axios,
    id: `${placeType?.id}`,
  });

  const onSubmit = async (data: NewPlaceSchema) => {
    if (placeType) {
      try {
        await updatePlace(
          {
            name: data.name,
            city: data.city,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["places"] });
              queryClient.invalidateQueries({ queryKey: ["place"] });
              toast.success(`Place créé avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createPlace(
          {
            name: data.name,
            city: data.city,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["places"] });
              queryClient.invalidateQueries({ queryKey: ["place"] });
              toast.success(`Place modifiéé avec avec succèes`);
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
            defaultValue={placeType?.name}
            placeholder="Entrer le nom"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Ville</p>
          <TextField.Root
            {...register("city")}
            defaultValue={placeType?.city}
            placeholder="Entrer le nom de la ville"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting} mt="4">
          {placeType ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default PlacesForm;
