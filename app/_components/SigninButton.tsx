"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {


  return (
    <div className="flex gap-4 space-y-4">
      <Link href="/api/auth/signin">Signin</Link>
      <Link href="/signup">Signup</Link>
    </div>
  );
};

export default SigninButton;
