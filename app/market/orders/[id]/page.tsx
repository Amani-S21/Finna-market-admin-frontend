"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formattedDate } from "@/app/lib/tools";
import { Roles, Status } from "@/app/lib/types";
import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { notFound, useParams } from "next/navigation";
import { Suspense, useState } from "react";
import QRCode from "react-qr-code";
import {
  DelivererSelect,
  OrderDetailsFeaturesTable,
  OrderStatusBadge,
} from "../_components";
import { useFetchOrderById } from "../_features/hooks";
import LoadingOrderDetailsPage from "./loading";

const BuildOrderDetailsPage = () => {
  const { status, data: session } = useSession();
  const axios = useAxiosAuth();
  const params = useParams<{ id: string }>();
  const id = params.id ?? "";

  const affectations = session?.data?.shopAffectations ?? [];

  const role = () => {
    if (affectations.length > 0) {
      if (affectations && affectations.length > 0) {
        return affectations[0].role as Roles;
      }
    } else {
      return session?.data.role as Roles;
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: ordersResponse,
    isLoading,
    error,
  } = useFetchOrderById({
    axios,
    orderId: id,
    enabled: status === "authenticated",
  });

  if (isLoading || status === "loading") return <LoadingOrderDetailsPage />;

  if (error) notFound();

  return (
    <>
      <BackButton />
      <Grid columns="3" mt="4" gapX="4">
        <div className="col-span-2">
          <Heading mb="1" className="lowercase first-letter:uppercase">
            {formattedDate(`${ordersResponse?.data?.createdAt}`)}
          </Heading>
          <Flex gap="2" mt="6" mb="5" align="center">
            <Text size="2">Catgégorie</Text>
            <Badge>
              <Text size="2">{ordersResponse?.data.orderType.name}</Text>
            </Badge>
          </Flex>
          {ordersResponse?.data?.status && (
            <Flex gap="2" mt="4" mb="5" align="center">
              <Text size="2">Status</Text>
              <OrderStatusBadge
                status={ordersResponse?.data?.status as Status}
              />
            </Flex>
          )}

          <Text mt="4" size="2" className="font-bold mt-4">
            Client propriétaire de la commande
          </Text>
          <Card mt="1" mb="5">
            <Flex align="center" gap="2">
              <div className="h-10 w-10 border border-gray-200 rounded-full uppercase flex items-center justify-center">{`${ordersResponse?.data?.customer?.fullName?.substring(
                0,
                1
              )}`}</div>
              <Flex direction="column">
                <p className="lowercase first-letter:uppercase">
                  {ordersResponse?.data?.customer?.fullName}
                </p>
                <p className="text-sm font-bold text-gray-600">
                  {ordersResponse?.data?.customer?.phone}
                </p>
              </Flex>
            </Flex>
          </Card>

          {ordersResponse?.data?.deliverer && (
            <>
              <Text mt="4" size="2" className="font-bold mt-4">
                Livreur responsable de la commande
              </Text>
              <Card mt="1" mb="5">
                <Flex align="center" gap="2">
                  <div className="h-10 w-10 border border-gray-200 rounded-full uppercase flex items-center justify-center">
                    {ordersResponse?.data?.deliverer?.fullName?.substring(0, 1)}
                  </div>
                  <Flex direction="column">
                    <p className="lowercase first-letter:uppercase">
                      {ordersResponse?.data?.deliverer?.fullName}
                    </p>
                    <p className="text-sm font-bold text-gray-600">
                      {ordersResponse?.data?.deliverer?.phone}
                    </p>
                  </Flex>
                </Flex>
              </Card>
            </>
          )}

          <Text as="p" size="2" className="font-bold">
            Produits commandés
          </Text>
          <Text as="p" size="2" mt="1" mr="2">
            Tous les produits commandés par l'utilisateurs avec toutes les
            caractéristiques séléctionnées
          </Text>
          {ordersResponse?.data?.ordersDetails && (
            <OrderDetailsFeaturesTable
              orderDetails={ordersResponse?.data?.ordersDetails}
            />
          )}
          <Flex mt="5" gap="4" align="start">
            <div className="h-37.5 w-37.5 mt-4">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${ordersResponse?.data.code}`}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div>
              <Text mt="6" as="p" size="2" className="font-bold">
                Code commande
              </Text>
              <Text as="p" size="6" mt="1" mr="2">
                {ordersResponse?.data.code}
              </Text>
            </div>
          </Flex>

          
        </div>
        {role() === "DELIVERER_ADMIN" ||
          (role() === "SUPER_ADMIN" && (
            <div>
              <DelivererSelect
                open={openDialog}
                setOpen={setOpenDialog}
                orderId={`${ordersResponse?.data?.id}`}
              />
              {ordersResponse?.data?.deliverer ? (
                <Flex align="center" gap="4" mt="2">
                  <Info color="green" />
                  <Text as="p" size="2" mt="2" mr="2">
                    Vous pouvez modifier le livreur séléctionné en cliquant sur
                    ce bouton si haut
                  </Text>
                </Flex>
              ) : (
                <Text color="red" as="p" size="2" mt="2" mr="2">
                  Aucun livreur assigné à cette commande, veuillez cliquer sur
                  le bouton en haut pour en séléctioner un
                </Text>
              )}
            </div>
          ))}
      </Grid>
    </>
  );
};

const OrderDetailsPage = () => {
  return (
    <Suspense fallback={<LoadingOrderDetailsPage />}>
      <BuildOrderDetailsPage />
    </Suspense>
  );
};

export default OrderDetailsPage;
