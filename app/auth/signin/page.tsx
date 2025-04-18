"use client";

import { Card, Flex } from "@radix-ui/themes";
import { use } from "react";
import SigninForm from "./_components/SigninForm";

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
}

const SigninPage = ({ searchParams }: Props) => {
  const { callbackUrl } = use(searchParams);

  return (
    <Card className="drop-shadow-2xl">
      <Flex direction="column" className="items-center min-w-sm p-4">
        <p className="text-xl font-bold">Login</p>
        <SigninForm callbackUrl={callbackUrl} />
      </Flex>
    </Card>
  );
};

export default SigninPage;
