"use client"

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useFetchOrdersSummary } from "../../orders/_features/hooks";
import LoadingDashboardPage from "../loading";

const OrdersSummary = () => {
  const { status } = useSession();
  const axios = useAxiosAuth();

  const {
    data: orderSummaryCounts,
    isLoading,
    error,
  } = useFetchOrdersSummary({ axios, enabled: status === "authenticated" });

  if (isLoading || status === "loading") return <LoadingDashboardPage />;

  if (error) return;

  return (
    <Flex gap="4">
      <OrdersSummaryItem
        title="Ouverts"
        description="Total des commandes ouverts"
        value={orderSummaryCounts?.opened ?? 0}
        link="/market/orders/list?status=OPEN&page=1"
      />
      <OrdersSummaryItem
        title="En cours"
        description="Total des commandes en cours"
        value={orderSummaryCounts?.inProgress ?? 0}
        link="/market/orders/list?status=IN_PROGRESS&page=1"
      />
      <OrdersSummaryItem
        title="Annulées"
        description="Total des commandes annulées"
        value={orderSummaryCounts?.canceled ?? 0}
        link="/market/orders/list?status=CANCELED&page=1"
      />
      <OrdersSummaryItem
        title="Terminées"
        description="Total des commandes terminées"
        value={orderSummaryCounts?.closed ?? 0}
        link="/market/orders/list?status=CLOSED&page=1"
      />
    </Flex>
  );
};

type OrdersSummaryItemProps = {
  title: string;
  value: number;
  description: string;
  link: string;
};

const OrdersSummaryItem = ({
  title,
  value,
  description,
  link,
}: OrdersSummaryItemProps) => {
  return (
    <div className=" w-full h-full min-h-[200px]">
      <Link href={link}>
        <Card>
          <Flex direction="column" gap="4">
            <Flex direction="column">
              <Heading size="4">{title}</Heading>
              <div className="max-w-[200px]">
                <Text as="p" size="2" mt="1">
                  {description}
                </Text>
              </div>
            </Flex>
            <Flex align="center" gap="1">
              <Text as="p" className="font-bold">
                {value}
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </div>
  );
};


export default OrdersSummary;
