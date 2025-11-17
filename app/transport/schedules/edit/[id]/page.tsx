"use client";

import { BackButton } from "@/app/_components";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { formatTime } from "@/app/lib/timeformat";
import {
  addTripLeg,
  clearTripLeg,
  deleteTripLeg,
} from "@/redux/features/scheduleSlice";
import { RootState } from "@/redux/store";
import { Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import NewScheduleForm from "../../_components/NewScheduleForm";
import NewScheduleLegDialog from "../../_components/NewScheduleLegDialog";
import { useFetchSchedule } from "../../_features/hooks";

const EditSchedulePage = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const tripLegs = useSelector((state: RootState) => state.schedule.tripLegs);
  const params = useParams<{ id: string }>();
  const id = params.id;
  const axios = useAxiosAuth();

  const {
    data: schedule,
  } = useFetchSchedule({
    axios,
    id,
    enabled: status === "authenticated",
  });

  useEffect(() => {
    if (schedule) {
      for (const e of schedule.legs) {
        dispatch(
          addTripLeg({
            id: `${new Date()}`,
            departure: e.departure,
            arrival: e.arrival,
            fromId: e.fromId,
            fromName: e.from.name,
            toId: e.toId,
            toName: e.to.name,
            order: e.order,
            price: e.price,
          })
        );
      }
    }
  }, [schedule, dispatch]);

  return (
    <div>
      <Flex direction="column" className="w-full">
        <div className="mb-2">
          <div onClick={() => dispatch(clearTripLeg())}>
            <BackButton />
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <IoStorefrontOutline />
            <span className="font-bold">Modifier l'horaire</span>
          </div>
          <Text as="p" size="2" mb="4">
            Remplissez les champs ci dessous pour modifier une horaire
          </Text>
        </div>

        <Flex gap="6">
          <NewScheduleForm schedule={schedule} vehicleId={id} />
          <Flex direction="column" className="max-w-2xl">
            <Flex
              mt="8"
              mb="6"
              justify="between"
              align="center"
              className="max-w-xl "
            >
              <Flex direction="column">
                <div className="flex items-center space-x-4">
                  <IoStorefrontOutline />
                  <span className="font-bold">Scales</span>
                </div>
                <Text as="p" size="2">
                  Vous pouvez ajouter les scales s'il y en a
                </Text>
              </Flex>
              <NewScheduleLegDialog open={open} setOpen={setOpen} />
            </Flex>
            {tripLegs?.map((trip) => (
              <Card key={trip.id} mb="4">
                <Flex justify="between">
                  <Flex direction="column">
                    <Card variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Heure de départ
                      </Text>
                      <p className="mt-1">{formatTime(trip.departure)}</p>
                    </Card>
                    <Card mt="4" variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Heure d'arrivé
                      </Text>
                      <p className="mt-1">{formatTime(trip.arrival)}</p>
                    </Card>
                    <Card mt="4" variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Provenance
                      </Text>
                      <p className="mt-1">{trip.fromName}</p>
                    </Card>
                    <Card mt="4" variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Déstination
                      </Text>
                      <p className="mt-1">{trip.toName}</p>
                    </Card>
                    <Card mt="4" variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Prix
                      </Text>
                      <p className="mt-1">{trip.price}</p>
                    </Card>
                    <Card mt="4" variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Numero du scale
                      </Text>
                      <p className="mt-1">{trip.order}</p>
                    </Card>
                  </Flex>
                  <IconButton onClick={() => dispatch(deleteTripLeg(trip))}>
                    <Trash />
                  </IconButton>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default EditSchedulePage;
