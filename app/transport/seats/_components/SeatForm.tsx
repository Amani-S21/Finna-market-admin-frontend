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
import { Seat } from "../_features/types";
import { seatSchema, SeatSchema } from "../_features/validations";
import { useCreateSeat, useUpdateSeat } from "../_features/hooks";
import { useEffect } from "react";

type Props = {
  seat?: Seat;
  vehicleId: string;
};

const VehicleTypeForm = ({ seat, vehicleId }: Props) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SeatSchema>({
    resolver: zodResolver(seatSchema),
  });

  const { mutateAsync: createSeat, error: createError } = useCreateSeat({
    axios,
  });

  const { mutateAsync: updateSeat, error: updateError } = useUpdateSeat({
    axios,
    id: `${seat?.id}`,
  });

  const onSubmit = async (data: SeatSchema) => {
    if (seat) {
      try {
        await updateSeat(
          {
            seatNumber: data.seatNumber,
            type: "ECONOMIC",
            vehicleId: vehicleId,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["seats-by-vehicle"] });
              queryClient.invalidateQueries({ queryKey: ["seat"] });
              toast.success(`Place de buss Modifiée avec avec succèes`);
              router.back();
            },
          }
        );
      } catch (error: any) {
        // toast.error(JSON.stringify(error));
      }
    } else {
      try {
        await createSeat(
          {
            seatNumber: data.seatNumber,
            type: "ECONOMIC",
            vehicleId: vehicleId,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["seats-by-vehicle"] });
              queryClient.invalidateQueries({ queryKey: ["seat"] });
              toast.success(`Place de buss créé avec avec succèes`);
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
    if (seat) {
      setValue("seatNumber", `${seat.seatNumber}`);
    }
  }, [seat, setValue]);

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
          <p className="text-sm font-bold">Numerotation de la place</p>
          <TextField.Root
            {...register("seatNumber")}
            placeholder="Entrer la numerotation"
          />
          <ErrorMessage>{errors.seatNumber?.message}</ErrorMessage>
        </div>

        <Button disabled={isSubmitting} mt="4">
          {seat ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default VehicleTypeForm;
