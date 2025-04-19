import { Skeleton, Table } from "@radix-ui/themes";
import { GrMoreVertical } from "react-icons/gr";
import "react-loading-skeleton/dist/skeleton.css";
import ShopsToolBar from "./_components/ShopsToolBar";

const LoadingShopspPage = () => {
  const shops = [...Array(5)];

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
          {shops.map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingShopspPage;
