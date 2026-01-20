import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { OrderDetail } from "@/app/lib/types";
import { Badge, Flex, Text } from "@radix-ui/themes";
import { Edit } from "lucide-react";
import { useProductTaking } from "../../orders/_features/hooks";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Spinner } from "@/app/_components";

type Props = {
  orderDetail: OrderDetail;
};

const RequizitionItem = ({ orderDetail }: Props) => {
  const axios = useAxiosAuth();
  const { data: session } = useSession();

  const { mutateAsync: confirmProductTaking, isPending } = useProductTaking({
    axios,
  });

  const handleItemClicked = async () => {
    confirmProductTaking(
      {
        id: orderDetail.orderProductTaking.id,
        shopAgentId: `${session?.data.id}`,
      },
      {
        onSuccess: () => {
          toast.success("Opération effectuée avec succès");
        },
      }
    );
  };

  if (!orderDetail.orderProductTaking)
    return (
      <Badge color="blue"  className="hover:cursor-default">
        <Text>Aucune réquisition</Text>
      </Badge>
    );

  if (orderDetail.orderProductTaking) {
    if (!orderDetail.orderProductTaking.shopAgentId) {
      return (
        <Badge
          color="red"
          onClick={handleItemClicked}
          className="hover:cursor-pointer"
        >
          <Flex gap="4">
            <Text>Réquisition non confirmée</Text>
            {isPending ? <Spinner /> : <Edit size={18} />}
          </Flex>
        </Badge>
      );
    } else {
      return (
        <Badge color="green"  className="hover:cursor-default">
          <Text>Réquisition confirmée</Text>
        </Badge>
      );
    }
  }

  return <div>RequizitionItem</div>;
};

export default RequizitionItem;
