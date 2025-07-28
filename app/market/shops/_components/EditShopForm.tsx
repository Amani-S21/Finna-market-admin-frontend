"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import axios from "@/app/lib/axios";
import { EditShopSchema, Shop } from "@/app/lib/types";
import { editShopSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateShop } from "../_features/hooks";

const EditShopForm = ({ shop }: { shop?: Shop }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditShopSchema>({
    resolver: zodResolver(editShopSchema),
  });

  const {
    mutateAsync: updateShop,
    isSuccess: isUpdateSuccess,
    error: updateError,
  } = useUpdateShop({ axios });

  const onSubmit = async (data: EditShopSchema) => {
    if (shop) {
      try {
        await updateShop({
          id: shop.id,
          ...data,
        });
      } catch (error: any) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(`Boutique modifiée avec avec succès`);
      router.back();
    }
  }, [isUpdateSuccess, router]);

  return (
    <div className="max-w-xl">
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
            defaultValue={shop?.name}
            placeholder="Nom de la boutique"
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Addrèsse</p>
          <TextArea
            {...register("address")}
            rows={6}
            defaultValue={shop?.address}
            placeholder="Addrèsse de la boutique"
          />
          <ErrorMessage>{errors.address?.message}</ErrorMessage>
        </div>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Pourcentage</p>
          <TextField.Root
            {...register("percentage")}
            type="number"
            placeholder="Veuillez saisir le pourcentage"
          />
          <ErrorMessage>{errors.percentage?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting} mt="4">
          {shop ? "Modifier" : "Enregistrer"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default EditShopForm;
