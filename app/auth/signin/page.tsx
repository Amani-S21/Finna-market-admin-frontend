"use client";

import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { use } from "react";

interface Props {
    searchParams: Promise<{ callbackUrl: string }>
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
    <div className="p-6">
      <p className="text-3xl font-bold mb-2">SigninPage</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
        commodi similique voluptatibus deserunt quas quos. Nostrum quasi natus
        magni consequuntur consectetur provident quaerat asperiores nisi
        accusamus explicabo? Consequuntur, ipsa repellat.
      </p>

      <Button mt="2" onClick={onSubmit}>
        SignIn
      </Button>
    </div>
  );
};

export default SigninPage;
