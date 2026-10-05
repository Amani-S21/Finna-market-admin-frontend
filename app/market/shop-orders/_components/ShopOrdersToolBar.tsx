import PageToolbar from "@/app/_components/PageToolbar";
import { Text } from "@radix-ui/themes";
import { AiOutlineOrderedList } from "react-icons/ai";
import { OrdersResponse } from "@/app/lib/types";
import { OrderStatusFilter } from "../../orders/_components";

const ShopOrdersToolBar = ({ order }: { order?: OrdersResponse }) => {
  return (
    <PageToolbar icon={<AiOutlineOrderedList />} title="Commandes boutique" description="Toutes les commandes de la boutique">
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
    </PageToolbar>
  );
};

export default ShopOrdersToolBar;
