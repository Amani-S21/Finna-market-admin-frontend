"use client";

import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { BackButton } from "../../_components";
import ProfileItem from "../_components/ProfileItem";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { useFetchUser } from "@/app/market/users/_features/hooks";
import LoadingProfilePage from "./loading";
import { signOut } from "next-auth/react";

const ProfilePage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();

  const { data: user, isLoading } = useFetchUser({
    axios,
    userId: `${session?.data.id}`,
    enabled: status === "authenticated",
  });

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };
  if (isLoading || status === "loading") return LoadingProfilePage();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <div className="flex items-center border-b border-gray-200 h-[80px] mb-8">
          <div className="max-w-3xl w-full mx-auto flex justify-between">
            <Flex align="center" gap="4">
              <FaRegUserCircle />
              <Flex direction="column">
                <Text as="p" className="font-bold">
                  Profile
                </Text>
                <Text as="p" size="1">
                  Informations du compte
                </Text>
              </Flex>
            </Flex>
            <BackButton />
          </div>
        </div>
        <div className="max-w-3xl w-full mx-auto flex flex-col">
          <Flex>
            <div className="mb-4 bg-green-00 ">
              <Avatar
                fallback={`${user?.fullName?.substring(0, 2)}`}
                radius="full"
                size="8"
              />
            </div>
            <Flex direction="column" ml="5" className="bg-amber-0 w-full">
              <ProfileItem title="Nom complet" value={`${user?.fullName}`} />
              <Separator size="4" mt="4" mb="5" />
              <ProfileItem
                title="Numero de téléphone"
                value={`${user?.phone}`}
              />
              <Separator size="4" mt="4" mb="5" />
              <ProfileItem
                title="Addrèsse mail"
                value={`${user?.emailAddress}`}
              />
              <Separator size="4" mt="4" mb="5" />
              <Flex justify="between" align="center">
                <ProfileItem title="Mot de passe" value="*******************" />
                <Link href="/profile/password/edit">
                  <IconButton variant="ghost">
                    <CiEdit />
                  </IconButton>
                </Link>
              </Flex>
              <div className="self-start flex gap-4">
                <Link href="/profile/edit">
                  <Button mt="8">Editer le profile</Button>
                </Link>
                <Button
                  variant="outline"
                  color="red"
                  mt="8"
                  onClick={handleSignOut}
                >
                  Se déconnecter
                </Button>
              </div>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
