"use client";

import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { IconButton, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { GrMoreVertical } from "react-icons/gr";
import ShopsToolBar from "./_components/ShopsToolBar";
import LoadingShopspPage from "./loading";

const ShopsPage = () => {
  const axios = useAxiosAuth();

  const {
    data: shopsResponse,
    isLoading,
    error,
  } = useQuery<ShopsListResponse>({
    queryKey: ["shops"],
    queryFn: () => axios.get("/shops?page=1&limit=100").then((res) => res.data),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <LoadingShopspPage />;

  if (error) return;

  return (
    <div>
      <ShopsToolBar />
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
                <IconButton variant="ghost" ml="4">
                <GrMoreVertical color="black" />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default ShopsPage;
