"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Badge, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { use } from "react";
import { UserRoleBadge } from "../_components";
import { useFetchUser } from "../_features/hooks";
import LoadingUserDetailsPage from "./loading";

const UserDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { status } = useSession();
  const axios = useAxiosAuth();
  const { id } = use(params);

  const { data: user, isLoading } = useFetchUser({
    axios,
    userId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return LoadingUserDetailsPage();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4">
        <Flex direction="column" gap="4" className="col-span-2">
          <Flex gap="2" align="center">
            <Badge radius="large" className="uppercase">
              <p className="p-4 text-xl">{user?.fullName.substring(0, 1)}</p>
            </Badge>
            <Flex direction="column">
              <Heading className="lowercase first-letter:uppercase">
                {user?.fullName}
              </Heading>
              <Text size="1" mt="1" as="p" className="font-bold text-gray-600">
                {user?.phone}
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="1">
            <Text size="2" className="font-bold">
              Date création
            </Text>
            <Text size="2">{user?.createdAt}</Text>
          </Flex>

          <div>
            <Text as="p" mb="1" size="2" className="font-bold">
              Role
            </Text>
            {user?.role && <UserRoleBadge role={user?.role} />}
          </div>
        </Flex>
        <div>
          <Link href={`/market/users/edit/${user?.id}`}>
            <Button>Modifier</Button>
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default UserDetailsPage;
