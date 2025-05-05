"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useFetchUser } from "@/app/market/users/_features/hooks";
import { Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import { EditProfileForm } from "../_components";
import LoadingEditProfilePage from "./loading";

const EditProfilePage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();

  const { data: user, isLoading } = useFetchUser({
    axios,
    userId: `${session?.data.id}`,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return LoadingEditProfilePage();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 h-[80px] mb-8">
          <Flex
            justify="between"
            gap="4"
            className="col-span-2 w-full max-w-3xl mx-auto"
          >
            <Flex align="center" gap="4">
              <FaRegUserCircle size={15} />
              <Flex direction="column">
                <Text as="p" className="font-bold">
                  Modifier les informations du compte
                </Text>
                <Text as="p" size="1">
                  Completez les champs ci-dessous pour modifier votre compte
                </Text>
              </Flex>
            </Flex>

            <BackButton />
          </Flex>
        </div>
        <div className="min-w-3xl mx-auto">
          {user && <EditProfileForm user={user} />}
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
