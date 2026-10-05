"use client";

import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Separator,
} from "@radix-ui/themes";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import AccountPage from "@/app/_components/AccountPage";
import styles from "@/app/_components/interfaces.module.css";
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
    <AccountPage title="Mon profil" description="Retrouvez vos informations personnelles et les paramètres de votre compte.">
      <div className={styles.profileGrid}>
        <div className={styles.profileAvatar}>
              <Avatar
                fallback={`${user?.fullName?.substring(0, 2)}`}
                radius="full"
                size="8"
              />
            </div>
            <div className={styles.profileFields}>
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
                  <IconButton variant="ghost" aria-label="Modifier le mot de passe">
                    <CiEdit />
                  </IconButton>
                </Link>
              </Flex>
              <div className={styles.profileActions}>
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
        </div>
      </div>
    </AccountPage>
  );
};

export default ProfilePage;
