"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Vehicle } from "../../agencies/_features/type";
import VehicleTypeSelect from "../../vehicle-types/_components/VehicleTypesSelect";
import { VehicleType } from "../../vehicle-types/_features/types";
import { useCreateVehicle, useUpdateVehicle } from "../_features/hooks";
import { NewVehicleSchema } from "../_features/types";
import { newVehicleSchema } from "../_features/validations";


const VehicleForm = ({
  agencyId,
  vehicle,
}: {
  agencyId: string;
  vehicle?: Vehicle;
}) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const agency = useSelector((state: RootState) => state.agency.currentAgency);
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewVehicleSchema>({
    resolver: zodResolver(newVehicleSchema),
    defaultValues: {
      plateNumber: vehicle?.plateNumber ?? "",
      model: vehicle?.model ?? "",
      capacity: `${vehicle?.capacity}`,
    },
  });

  useEffect(() => {
    if (vehicle) {
      setValue("plateNumber", vehicle.plateNumber);
      setValue("model", vehicle.model);
      setValue("capacity", `${vehicle.capacity}`);
    }
  }, [vehicle, setValue]);

  const { mutateAsync: createVehicle, error: createError } = useCreateVehicle({
    axios,
  });

  const { mutateAsync: updateVehicle, error: updateError } = useUpdateVehicle({
    axios,
    id: `${vehicle?.id}`,
  });

  const onSubmit = async (data: NewVehicleSchema) => {
    if (vehicle) {
      try {
        await updateVehicle(
          {
            plateNumber: data.plateNumber,
            model: data.model,
            capacity: Number(data.capacity),
            vehicleTypeId: `${selectedVehicleType?.id}`,
            agencyId: vehicle.agencyId,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["vehicles"] });
              queryClient.invalidateQueries({ queryKey: ["vehicle"] });
              toast.success(`Vehicule modifié avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        // toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createVehicle(
          {
            plateNumber: data.plateNumber,
            model: data.model,
            capacity: Number(data.capacity),
            vehicleTypeId: `${selectedVehicleType?.id}`,
            agencyId,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["vehicles"] });
              queryClient.invalidateQueries({ queryKey: ["vehicle"] });
              toast.success(`Vehicule créé avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        // toast.error(JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    if (vehicle) {
      setSelectedVehicleType(vehicle.vehicleType);
    }
  }, [vehicle]);

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
          <p className="text-sm font-bold">Numero plaque</p>
          <TextField.Root
            {...register("plateNumber")}
            // defaultValue={vehicle?.plateNumber}
            placeholder="Entrer le numero de la plaque"
          />
          <ErrorMessage>{errors.plateNumber?.message}</ErrorMessage>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Model</p>
          <TextField.Root
            {...register("model")}
            // defaultValue={vehicle?.model}
            placeholder="Entrer le numero du model"
          />
          <ErrorMessage>{errors.model?.message}</ErrorMessage>
        </div>

        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Capacité</p>
          <TextField.Root
            {...register("capacity")}
            // defaultValue={vehicle?.capacity}
            placeholder="Entrer la capacité"
          />
          <ErrorMessage>{errors.capacity?.message}</ErrorMessage>
        </div>

        <VehicleTypeSelect
          setSelectedVehicleType={setSelectedVehicleType}
          selectedVehicleType={selectedVehicleType}
          open={openDialog}
          setOpen={setOpenDialog}
        />

        <Button disabled={isSubmitting} mt="6">
          {vehicle ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default VehicleForm;
