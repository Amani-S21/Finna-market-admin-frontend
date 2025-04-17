"use client";

import { Button } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import React from "react";

const ConnectButton = () => {
  return <Button onClick={() => signIn()}>Connect user</Button>;
};

export default ConnectButton;
