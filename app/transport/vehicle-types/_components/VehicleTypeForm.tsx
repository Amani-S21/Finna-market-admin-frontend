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
import { useCreateVehicleType, UseUpdateVehicleType } from "../_features/hooks";
import { VehicleType } from "../_features/types";
import { newVehicleSchema, NewVehicleSchema } from "../_features/validations";

const VehicleTypeForm = ({ vehicleType }: { vehicleType?: VehicleType }) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewVehicleSchema>({
    resolver: zodResolver(newVehicleSchema),
  });

  const { mutateAsync: createVehicleType, error: createError } =
    useCreateVehicleType({
      axios,
    });

  // const { mutateAsync: updateCategoryIcon } = useUpdateCategoryIcon({
  //   axios,
  // });

  const { mutateAsync: updateVehicleType, error: updateError } =
    UseUpdateVehicleType({ axios, id: `${vehicleType?.id}` });

  const onSubmit = async (data: NewVehicleSchema) => {
    if (vehicleType) {
      try {
        await updateVehicleType(
          {
            name: data.name,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["vehicle-types"] });
              queryClient.invalidateQueries({ queryKey: ["vehicle-type"] });
              toast.success(`Type de vehicule créé avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        // toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createVehicleType(
          {
            name: data.name,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["vehicle-types"] });
              queryClient.invalidateQueries({ queryKey: ["vehicle-type"] });
              toast.success(`Type de vehicule créé avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        // toast.error(JSON.stringify(error));
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
            defaultValue={vehicleType?.name}
            placeholder="Entrer le nom"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

       

        {/* <div className="flex flex-col space-y-2 mt-6">
          <Flex justify="between">
            <p className="text-sm font-bold">Sous catégorie</p>
            <Flex
              align="center"
              onClick={() => {
                dispatch(
                  addSubCategory({
                    index: subCategories?.length,
                    name: watch("subCategory") ?? "",
                  })
                );

                resetField("subCategory");
              }}
            >
              <IoIosAdd size={20} />
              <p className="text-sm underline hover:cursor-default">
                Ajoutrer à la liste
              </p>
            </Flex>
          </Flex>
          <TextField.Root
            {...register("subCategory")}
            placeholder="Type de la caractéristique"
          />
        </div> */}

        <Button disabled={isSubmitting} mt="4">
          {vehicleType ? "Modifier" : "Enregistrer"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default VehicleTypeForm;
