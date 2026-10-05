"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useFetchUser } from "@/app/market/users/_features/hooks";
import { useSession } from "next-auth/react";
import { EditProfileForm } from "../_components";
import LoadingEditProfilePage from "./loading";

import AccountPage from "@/app/_components/AccountPage";

const EditProfilePage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();

  const { data: user, isLoading } = useFetchUser({
    axios,
    userId: `${session?.data.id}`,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return LoadingEditProfilePage();

  return <AccountPage title="Modifier mon profil" description="Mettez à jour les informations de votre compte.">{user && <EditProfileForm user={user} />}</AccountPage>;
};

export default EditProfilePage;
