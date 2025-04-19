"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { Button, Flex, Table, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GrMoreVertical } from "react-icons/gr";
import { IoStorefrontOutline } from "react-icons/io5";

const ShopsPage = () => {
  const axios = useAxiosAuth();

  const { data: shopsResponse, error } = useQuery<ShopsListResponse>({
    queryKey: ["shops"],
    queryFn: () => axios.get("/shops?page=1&limit=100").then((res) => res.data),
    staleTime: 60 * 1000,
  });

  if (error) return;

   return (
    <div>
      <Flex justify="between">
        <div>
          <div className="flex items-center space-x-4">
            <IoStorefrontOutline />
            <span className="font-bold">Boutiques</span>
          </div>
          <Text as="p" size="2" mb="4">
            Toutes les boutiques disponibles dans l'entreprise
          </Text>
        </div>

        <Button mt="2">
          <span className="text-xs">Nouvelle Boutique</span>
        </Button>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>N</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Boutique</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Addrèsse</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Proprietaire</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Créé le</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {shopsResponse?.data.map((shop, index) => (
            <Table.Row key={shop.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{shop.name}</Table.Cell>
              <Table.Cell>{shop.address}</Table.Cell>
              <Table.Cell>Yala</Table.Cell>
              <Table.Cell>{shop.createdAt}</Table.Cell>
              <Table.Cell>
                <GrMoreVertical />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ShopsPage;
