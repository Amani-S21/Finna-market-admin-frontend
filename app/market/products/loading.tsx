import { Skeleton, Table } from "@radix-ui/themes";
import { ProductsToolBar } from "./_components";

const LoadingProductsPage = () => {
  const products = [...Array(5)];

  return (
    <div>
      <ProductsToolBar />
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
          {products.map((_, index) => (
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
      <div className="flex gap-4">
        <Skeleton className="mt-4 w-[100px]" />
        <Skeleton className="mt-4 w-[100px]" />
      </div>
    </div>
  );
};

export default LoadingProductsPage;
