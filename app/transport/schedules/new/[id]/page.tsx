"use client";

import { BackButton } from "@/app/_components";
import { deleteTripLeg } from "@/redux/features/scheduleSlice";
import { RootState } from "@/redux/store";
import { Card, Flex, IconButton, Text } from "@radix-ui/themes";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoStorefrontOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import NewScheduleForm from "../../_components/NewScheduleForm";
import NewScheduleLegDialog from "../../_components/NewScheduleLegDialog";

const NewSchedulePage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const tripLegs = useSelector((state: RootState) => state.schedule.tripLegs);
  const params = useParams<{ id: string }>();
  const id = params.id;
  

  return (
    <div>
      <Flex direction="column" className="w-full">
        <div className="mb-2">
          <BackButton />
          <div className="flex items-center space-x-4 mt-2">
            <IoStorefrontOutline />
            <span className="font-bold">Nouvel horaire</span>
          </div>
          <Text as="p" size="2" mb="4">
            Remplissez les champs ci dessous pour créer une horaire
          </Text>
        </div>

        <Flex gap="6">
          <NewScheduleForm vehicleId={id}/>
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
              <NewScheduleLegDialog
                vehicleId=""
                open={open}
                setOpen={setOpen}
              />
            </Flex>
            {tripLegs?.map((trip) => (
              <Card key={trip.id} mb="4">
                <Flex justify="between">
                  <Flex direction="column">
                    <Card variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Heure de départ
                      </Text>
                      <p className="mt-1">{trip.departure}</p>
                    </Card>
                    <Card mt="4" variant="ghost">
                      <Text size="2" className="text-gray-600 font-bold">
                        Heure d'arrivé
                      </Text>
                      <p className="mt-1">{trip.arrival}</p>
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

export default NewSchedulePage;
