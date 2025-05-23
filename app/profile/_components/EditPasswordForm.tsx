"use client";

import { ErrorMessage, Spinner } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { UpdatePasswordSchema } from "@/app/lib/types";
import { updatePasswordSchema } from "@/app/lib/validationSchemas";
import { useUpdatePassword } from "@/app/profile/_features/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditPasswordForm = () => {
  const { data: session } = useSession();
  const axios = useAxiosAuth();
  const router = useRouter();

  const {
    mutateAsync: updatePassword,
    isError,
    error,
    isSuccess,
  } = useUpdatePassword({
    axios,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordSchema) => {
    try {
      await updatePassword({
        id: `${session?.data.id}`,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Mot de passe modifiée avec succèes`);
      router.back();
    }
  }, [isSuccess]);

  return (
    <div className="max-w-xl">
      {isError && (
        <Callout.Root mb="4" color="red">
          <Callout.Text>{error?.message}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" gap="2">
          <p className="text-sm font-bold">Ancien mot de passe</p>
          <TextField.Root
            {...register("oldPassword")}
            placeholder="Saisissez l'ancien mot de passe"
            type="password"
          />
          <ErrorMessage>{errors.oldPassword?.message}</ErrorMessage>
        </Flex>
        <Flex direction="column" gap="2" mt="4">
          <p className="text-sm font-bold">Nouveau mot de passe</p>
          <TextField.Root
            {...register("newPassword")}
            placeholder="Saisissez le nouveau mot de passe"
            type="password"
          />
          <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
        </Flex>
        <Flex direction="column" gap="2" mt="4">
          <p className="text-sm font-bold">Confirmer le mot de passe</p>
          <TextField.Root
            {...register("confirmPassword")}
            placeholder="Saisissez encore le mot de passe"
            type="password"
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        </Flex>
        <Button disabled={isSubmitting} mt="5">
          Modifier {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default EditPasswordForm;
