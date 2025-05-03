"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { use } from "react";
import { FaUsers } from "react-icons/fa6";
import { UserForm } from "../../_components";
import { useFetchUser } from "../../_features/hooks";
import LoadingEditUserPage from "./loading";

const EditUserPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { id } = use(params);

  const { data: user, isLoading } = useFetchUser({
    axios,
    userId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return LoadingEditUserPage();

  return (
    <div>
      <div className="mb-2">
        <BackButton />
        <div className="flex items-center space-x-4 mt-5">
          <FaUsers />
          <span className="font-bold">Utilisateur</span>
        </div>
        <Text as="p" size="2" mb="4">
          Remplissez les champs ci dessous pour modifier les données de
          l'utilisateur
        </Text>
      </div>
      <UserForm user={user} />
    </div>
  );
};

export default EditUserPage;
