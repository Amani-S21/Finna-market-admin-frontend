"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import Spinner from "@/app/_components/Spinner";
import { SigninSchema } from "@/app/types";
import { signinSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Key, Phone } from "lucide-react";

const SigninForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({ resolver: zodResolver(signinSchema) });

  const onSubmit = async (data: SigninSchema) => {
    await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <form
      className="flex flex-col mt-6 w-full max-w-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col space-y-2 mt-5">
        <p className="text-sm font-bold">Numero de téléphone</p>
        <TextField.Root
          {...register("phone")}
          defaultValue="+243971945367"
          placeholder="Numero de téléphone"
        >
          <TextField.Slot>
            <Phone size={15}/>
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.phone?.message}</ErrorMessage>
      </div>
      <div className="flex flex-col space-y-2 mt-5">
        <p className="text-sm font-bold">Mot de passe</p>
        <TextField.Root
          {...register("password")}
          defaultValue="12345"
          type="password"
          placeholder="Mot de passe"
        >
          <TextField.Slot>
            <Key size={15}/>
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
      </div>
      <Button disabled={isSubmitting} mt="5">
        Connection {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default SigninForm;
