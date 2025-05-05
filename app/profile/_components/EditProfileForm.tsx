import { ErrorMessage, Spinner } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { UpdateUserSchema, User } from "@/app/lib/types";
import { updateUserSchema } from "@/app/lib/validationSchemas";
import { useUpdateUser } from "@/app/market/users/_features/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const EditProfileForm = ({ user }: { user: User }) => {
  const { data: session } = useSession();
  const axios = useAxiosAuth();
  const {
    mutateAsync: updateUser,
    isError,
    error,
    isSuccess,
  } = useUpdateUser({
    axios,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async (data: UpdateUserSchema) => {
    await updateUser({
      id: `${session?.data.id}`,
      fullName: data.fullName,
      phone: data.phone,
      emailAddress: data.emailAddress,
    });
  };

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2">
        <p className="text-sm font-bold">Nom compltet</p>
        <TextField.Root
          {...register("fullName")}
          defaultValue={user?.fullName}
          placeholder="Saisissez le nom compltet"
        />
        <ErrorMessage>{errors.fullName?.message}</ErrorMessage>
      </Flex>
      <Flex direction="column" gap="2" mt="4">
        <p className="text-sm font-bold">Numero de téléphone</p>
        <TextField.Root
          {...register("phone")}
          defaultValue={user?.phone}
          placeholder="Saisissez le numero de téléphone"
          type="tel"
        />
        <ErrorMessage>{errors.phone?.message}</ErrorMessage>
      </Flex>
      <Flex direction="column" gap="2" mt="4">
        <p className="text-sm font-bold">Addrésse mail</p>
        <TextField.Root
          {...register("emailAddress")}
          defaultValue={user?.emailAddress}
          placeholder="Saisissez l'addrèsse mail"
          type="email"
        />
        <ErrorMessage>{errors.emailAddress?.message}</ErrorMessage>
      </Flex>
      <Button disabled={isSubmitting} mt="5">
        Modifier {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default EditProfileForm;
