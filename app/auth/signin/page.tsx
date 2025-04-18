"use client";

import { Button, Card, Flex, Link, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { use } from "react";

interface Props {
  searchParams: Promise<{ callbackUrl: string }>;
}

const SigninPage = ({ searchParams }: Props) => {
  const { callbackUrl } = use(searchParams);

  const onSubmit = async () => {
    await signIn("credentials", {
      phone: "+243971945367",
      password: "12345",
      redirect: true,
      callbackUrl: callbackUrl,
    });
  };

  return (
    <Card className="drop-shadow-2xl">
      <Flex
        direction="column"
        className="items-center min-w-sm p-4"
      >
        <p className="text-xl font-bold my-4">Login</p>
        <div className="flex flex-col mt-6 w-full max-w-sm">
          <div className="flex flex-col space-y-2 mt-5">
            <p className="text-sm font-bold">Numero de téléphone</p>
            <TextField.Root placeholder="Numero de téléphone" />
          </div>
          <div className="flex flex-col space-y-2 mt-5">
            <p className="text-sm font-bold">Mot de passe</p>
            <TextField.Root type="password" placeholder="Mot de passe" />
          </div>
          <Button mt="5" onClick={onSubmit}>
            Enregistrer
          </Button>
          <span className="mx-auto mt-6 text-xs">
            Vous n'avez pas de compte
          </span>
          <span className="mx-auto mt-2 text-xs text-primary  cursor-pointer hover:underline">
            <Link href="/auth/signup">Créer en un</Link>
          </span>
        </div>
      </Flex>
    </Card>
  );
};

export default SigninPage;
