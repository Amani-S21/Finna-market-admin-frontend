"use client";

import { Spinner } from "@/app/_components";
import ErrorMessage from "@/app/_components/ErrorMessage";
import axios from "@/app/lib/axios";
import { AffectShopSchema } from "@/app/lib/types";
import { affectShopSchema } from "@/app/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAffectShop } from "../_features/hooks";
import SearchUserTextField from "./SearchUserField";

const AffectShopForm = ({ shopId }: { shopId: string }) => {
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AffectShopSchema>({
    resolver: zodResolver(affectShopSchema),
  });

  const {
    mutateAsync: affectShop,
    isPending,
    isSuccess,
    error,
  } = useAffectShop({ axios });

  const onSubmit = async (data: AffectShopSchema) => {
    try {
      await affectShop({
        shopId,
        userId,
        role: "SUPER_MARKET_ADMIN",
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["shop"] });
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      toast.success(`Boutique affectéé avec succès`);
      router.back();
    }
  }, [isSuccess, router]);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{error?.message}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="userName"
          render={({ field }) => (
            <div className="flex flex-col space-y-2 mt-6">
              <p className="text-sm font-bold">Propriétaire</p>
              <SearchUserTextField {...field} setSelectedId={setUserId} />
              <ErrorMessage>{errors.userName?.message}</ErrorMessage>
            </div>
          )}
        />
        <Button disabled={isSubmitting || isPending} mt="4">
          Enregistrer {(isSubmitting || isPending) && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default AffectShopForm;
