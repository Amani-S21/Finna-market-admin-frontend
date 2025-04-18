"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Flex, Link, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { use } from "react";
import { useForm } from "react-hook-form";
import { SigninSchema, signinSchema } from "./types";

interface Props {
  searchParams: Promise<{ callbackUrl: string }>;
}

const SigninPage = ({ searchParams }: Props) => {
  const { callbackUrl } = use(searchParams);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({ resolver: zodResolver(signinSchema) });

  const onSubmit = async (data: SigninSchema) => {
    await signIn("credentials", {
      phone: data.phone,
      password: data.password,
      redirect: true,
      callbackUrl: callbackUrl,
    });
  };

  return (
    <Card className="drop-shadow-2xl">
      <Flex direction="column" className="items-center min-w-sm p-4">
        <p className="text-xl font-bold my-4">Login</p>
        <form
          className="flex flex-col mt-6 w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-2 mt-5">
            <p className="text-sm font-bold">Numero de téléphone</p>
            <TextField.Root
              {...register("phone")}
              placeholder="Numero de téléphone"
            />
          </div>
          <div className="flex flex-col space-y-2 mt-5">
            <p className="text-sm font-bold">Mot de passe</p>
            <TextField.Root
              {...register("password")}
              type="password"
              placeholder="Mot de passe"
            />
          </div>
          <Button mt="5">Enregistrer</Button>
          <span className="mx-auto mt-6 text-xs">
            Vous n'avez pas de compte
          </span>
          <span className="mx-auto mt-2 text-xs text-primary  cursor-pointer hover:underline">
            <Link href="/auth/signup">Créer en un</Link>
          </span>
        </form>
      </Flex>
    </Card>
  );
};

export default SigninPage;
