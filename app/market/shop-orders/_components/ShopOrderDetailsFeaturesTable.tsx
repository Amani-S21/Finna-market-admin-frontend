import { OrderDetail } from "@/app/lib/types";
import { Table } from "@radix-ui/themes";
import RequizitionItem from "./RequizitionItem";

const ShopOrderDetailsFeaturesTable = ({
  orderDetails,
}: {
  orderDetails: OrderDetail[];
}) => {
  return (
    <Table.Root mt="2">
      <Table.Header>
        <Table.Row>
          {orderDetailsColumns.map((column) => (
            <Table.ColumnHeaderCell key={column.label}>
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orderDetails.map((orderDetail, index) => (
          <Table.Row key={orderDetail.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              {orderDetail.quantity}
            </Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              {orderDetail.shopHasProduct.product.name}
            </Table.Cell>
            {/* <Table.Cell>
              <div className="flex flex-wrap gap-2">
                {orderDetail.orderDetailFeatures.map((value) => (
                  <SelectSearchItem
                    key={value?.featureValue?.id}
                    title={value.featureValue.value}
                    valuePrice={
                      value.featureValue.featuresAffectationsHasValues.length >
                      0
                        ? value.featureValue.featuresAffectationsHasValues[0]
                            .price
                        : 0
                    }
                    currency="Usd"
                  />
                ))}
              </div>
            </Table.Cell> */}
            <Table.Cell className="lowercase first-letter:uppercase">
              {orderDetail.shopHasProduct.price}
            </Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              {orderDetail.quantity * orderDetail.shopHasProduct.price}
            </Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              <RequizitionItem orderDetail={orderDetail} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const orderDetailsColumns: {
  label: string;
}[] = [
  { label: "N" },
  { label: "Quantité" },
  { label: "Produit" },
  { label: "Pu" },
  { label: "Pt" },
  { label: "Etat produit" },
];

export default ShopOrderDetailsFeaturesTable;
