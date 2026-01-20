import { Flex, Text } from "@radix-ui/themes";
import { AiOutlineOrderedList } from "react-icons/ai";
import { OrdersResponse } from "@/app/lib/types";
import { OrderStatusFilter } from "../../orders/_components";

const ShopOrdersToolBar = ({ order }: { order?: OrdersResponse }) => {
  return (
    <Flex justify="between">
      <div>
        <div className="flex items-center space-x-4">
          <AiOutlineOrderedList />
          <span className="font-bold">Commandes boutique</span>
        </div>
        <Text as="p" size="2">
          Toutes les commandes de la boutique
        </Text>
      </div>
      {/* <Text size="6">{order.totalAmountInFrancs}</Text> */}

      <div className="justify-end flex items-center gap-6">
        <div className="flex flex-col items-center space-x-4">
          <span className="font-bold text-end self-end">Total</span>
          <Text as="p" size="6" className="text-end">
            {order?.totalAmountInFrancs}
          </Text>
        </div>

        <OrderStatusFilter />
      </div>
    </Flex>
  );
};

export default ShopOrdersToolBar;
