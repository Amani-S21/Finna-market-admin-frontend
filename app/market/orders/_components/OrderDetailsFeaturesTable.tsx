import { OrderDetail } from "@/app/lib/types";
import { Table } from "@radix-ui/themes";
import React from "react";
import { SelectSearchItem } from "../../products/_components";

const OrderDetailsFeaturesTable = ({
  orderDetails,
}: {
  orderDetails: OrderDetail[];
}) => {
  const totalOrderFeaturesPrice = (orderDetail: OrderDetail): number => {
    const total = orderDetail.orderDetailFeatures.reduce(
      (sum, item) =>
        (sum += item.featureValue.featuresAffectationsHasValues[0].price),
      0
    );
    return total + orderDetail.product.currentPrice;
  };

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
              {orderDetail.product.name}
            </Table.Cell>
            <Table.Cell>
              <div className="flex flex-wrap gap-2">
                {orderDetail.orderDetailFeatures.map((value) => (
                  <SelectSearchItem
                    key={value?.featureValue?.id}
                    title={value.featureValue.value}
                    valuePrice={
                      value.featureValue.featuresAffectationsHasValues[0]
                        .price
                    }
                    currency="Usd"
                  />
                ))}
              </div>
            </Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              {orderDetail.product.currentPrice}
            </Table.Cell>
            <Table.Cell className="lowercase first-letter:uppercase">
              {totalOrderFeaturesPrice(orderDetail) * orderDetail.quantity}
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
  { label: "Propriétés" },
  { label: "Pu" },
  { label: "Pt" },
];

export default OrderDetailsFeaturesTable;
