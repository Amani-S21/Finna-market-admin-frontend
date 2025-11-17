import {
  Button,
  Dialog,
  TextField,
} from "@radix-ui/themes";
import TimePickerComponent from "@/app/_components/TimePicker";
import PlaceSelect from "../../places/_components/PlacesSelect";
import { useState } from "react";
import { PlaceType } from "../../places/_features/types";
import { useDispatch } from "react-redux";
import { addTripLeg } from "@/redux/features/scheduleSlice";
import { DateObject } from "react-multi-date-picker";
import { newScheduleSchema, NewScheduleSchema } from "../_features/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

const NewScheduleLegDialog = ({ setOpen, open }: Props) => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceType>();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const [selectedDestinationPlace, setSelectedDestinationPlace] =
    useState<PlaceType>();
  const [openDestinationDialog, setOpenDestinationDialog] = useState(false);

  const [arrivalTime, setArrivalTime] = useState<DateObject | null>(null);
  const [depatureTime, setDepatureTime] = useState<DateObject | null>(null);

  const {
    register,
    handleSubmit,
    
  } = useForm<NewScheduleSchema>({
    resolver: zodResolver(newScheduleSchema),
  });

  const onSubmit = (data: NewScheduleSchema) => {
    const tripLegData = {
      id: `${new Date()}`,
      departure: `${depatureTime}`,
      arrival: `${arrivalTime}`,
      fromId: `${selectedPlace?.id}`,
      fromName: selectedPlace?.name,
      toId: `${selectedDestinationPlace?.id}`,
      toName: selectedDestinationPlace?.name,
      order: Number(data.order),
      price: Number(data.price),
    };

    dispatch(addTripLeg(tripLegData));

    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Ajouter</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" className="bg-green-500">
        <Dialog.Title size="4">Ajouter un scale</Dialog.Title>
        <Dialog.Description size="2">
          Completez les champs ci dessous pour ajouter un scale a ce voyage
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2 mt-6">
            <p className="text-sm font-bold">Heure de départ</p>
            <TimePickerComponent
              dateTime={depatureTime!}
              setDateTime={setDepatureTime}
            />
          </div>

          <div className="flex flex-col space-y-2 mt-6">
            <p className="text-sm font-bold">Heure d'arrivé</p>
            <TimePickerComponent
              dateTime={arrivalTime!}
              setDateTime={setArrivalTime}
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <p className="text-sm font-bold">Numero du scale</p>
            <TextField.Root
              {...register("order")}
              type="number"
              // defaultValue={product?.weightInGrams}
              placeholder="Scale num?"
            />
            {/* <ErrorMessage>{errors.weightInGrams?.message}</ErrorMessage> */}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <p className="text-sm font-bold">Prix</p>
            <TextField.Root
              {...register("price")}
              type="number"
              // defaultValue={product?.weightInGrams}
              placeholder="Veuillez saisir le prix du voyage"
            />
            {/* <ErrorMessage>{errors.weightInGrams?.message}</ErrorMessage> */}
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <p className="text-sm font-bold">Provenance</p>
            <PlaceSelect
              open={openDialog}
              setOpen={setOpenDialog}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <p className="text-sm font-bold">Déstination</p>
            <PlaceSelect
              open={openDestinationDialog}
              setOpen={setOpenDestinationDialog}
              selectedPlace={selectedDestinationPlace}
              setSelectedPlace={setSelectedDestinationPlace}
            />
          </div>

          <Button mt="6">Enregistrer</Button>
        </form>

        {/* <Flex gap="4" mt="8"> */}
        {/* {isPending ? <Text size="1">Chargement...</Text> : <p></p>} */}
        {/* <Dialog.Close>
            <Button type="button" variant="surface" color="gray">
              Annuler
            </Button>
          </Dialog.Close>
          <Button type="submit">
            <Text>Enregistrer</Text>
          </Button> */}
        {/* </Flex> */}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewScheduleLegDialog;
