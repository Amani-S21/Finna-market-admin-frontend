import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { RoomBookingSummary } from "../_features/types";

const RoomBookingSummaryArea = ({
  roomBookingSummaryCounts,
}: {
  roomBookingSummaryCounts: RoomBookingSummary;
}) => {
  return (
    <Flex gap="4" wrap={{initial : "wrap", md : "nowrap"}} className="">
      <RoomBookingsSummaryItem
        title="Tout"
        description="Total de toutes les réservations"
        value={roomBookingSummaryCounts?.all ?? 0}
        link="/market/orders/list?status=OPEN&page=1"
      />
      <RoomBookingsSummaryItem
        title="En cours"
        description="Total des réservations en cours"
        value={roomBookingSummaryCounts?.inProgress ?? 0}
        link="/market/orders/list?status=IN_PROGRESS&page=1"
      />
      <RoomBookingsSummaryItem
        title="Annulées"
        description="Total des réservations annulées"
        value={roomBookingSummaryCounts?.canceled ?? 0}
        link="/market/orders/list?status=CANCELED&page=1"
      />
      <RoomBookingsSummaryItem
        title="Confirmées"
        description="Total des réservations terminées"
        value={roomBookingSummaryCounts?.confirmed ?? 0}
        link="/market/orders/list?status=CLOSED&page=1"
      />
    </Flex>
  );
};

type RoomBookingsSummaryItemProps = {
  title: string;
  value: number;
  description: string;
  link: string;
};

const RoomBookingsSummaryItem = ({
  title,
  value,
  description,
  link,
}: RoomBookingsSummaryItemProps) => {
  return (
    <div className="w-full">
      <Link href={link}>
        <Card>
          <Flex direction="column" gap="4">
            <Flex direction="column">
              <Heading size="4">{title}</Heading>
              <div className="max-w-50">
                <Text as="p" size="2" mt="1">
                  {description}
                </Text>
              </div>
            </Flex>
            <Flex align="center" gap="1">
              <Text as="p" className="font-bold">
                {value}
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </div>
  );
};

export default RoomBookingSummaryArea;
