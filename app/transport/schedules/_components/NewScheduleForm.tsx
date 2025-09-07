import { ErrorMessage, Spinner } from "@/app/_components";
import TimePickerComponent from "@/app/_components/TimePicker";
import useAxiosAuth from "@/app/lib/hooks/useAxiosAuth";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, TextField } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { DateObject } from "react-multi-date-picker";
import { useSelector } from "react-redux";
import PlaceSelect from "../../places/_components/PlacesSelect";
import { PlaceType } from "../../places/_features/types";
import { useCreateTrip } from "../_features/hooks";
import { Schedule, TripPayload } from "../_features/types";
import { NewTripSchema, newTripSchema } from "../_features/validations";
import { AxiosError } from "axios";

export const weekDays: { day: string; value: number }[] = [
  { day: "Lundi", value: 1 },
  { day: "Mardi", value: 2 },
  { day: "Mercredi", value: 3 },
  { day: "Jeudi", value: 4 },
  { day: "Vendredi", value: 5 },
  { day: "Samedi", value: 6 },
  { day: "Dimanche", value: 7 },
];

type Props = {
  vehicleId: string;
  schedule?: Schedule;
};
const NewScheduleForm = ({ vehicleId, schedule }: Props) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedPlace, setSelectedPlace] = useState<PlaceType>();
  const [openDialog, setOpenDialog] = useState(false);
  const tripLegs = useSelector((state: RootState) => state.schedule.tripLegs);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [selectedDestinationPlace, setSelectedDestinationPlace] =
    useState<PlaceType>();
  const [openDestinationDialog, setOpenDestinationDialog] = useState(false);

  const [arrivalTime, setArrivalTime] = useState<DateObject | null>(null);
  const [depatureTime, setDepatureTime] = useState<DateObject | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewTripSchema>({
    resolver: zodResolver(newTripSchema),
  });

  const { mutateAsync: createSchedule, error: createError } = useCreateTrip({
    axios,
  });

  // const { mutateAsync: updateSchedule, error: updateError } = useUpdateTrip({
  //   axios,
  //   id: `${placeType?.id}`,
  // });

  const onSubmit = async (data: NewTripSchema) => {
    const trip: TripPayload = {
      departure: `${depatureTime}`,
      arrival: `${arrivalTime}`,
      fromId: `${selectedPlace?.id}`,
      toId: `${selectedDestinationPlace?.id}`,
      price: Number(data.price),
      vehicleId,
      dayOfWeek: Number(`${selectedDay}`),
      legs: (tripLegs ?? []).map(({ id, ...others }) => others),
    };

    try {
      await createSchedule(trip, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["schedules"] });
          queryClient.invalidateQueries({ queryKey: ["schedule"] });
          toast.success(`Horaire créé avec avec succèes`);
          router.back();
        },
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 mt-4">
          <p className="text-sm font-bold">Jour</p>
          <Select.Root
            onValueChange={(selectedDay) => {
              setSelectedDay(Number(selectedDay));
            }}
          >
            <Select.Trigger placeholder="Séléctionner un status" />
            <Select.Content>
              {weekDays.map((day) => (
                <Select.Item key={day.day} value={`${day.value}`}>
                  {day.day}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>

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
          <p className="text-sm font-bold">Prix</p>
          <TextField.Root
            {...register("price")}
            type="number"
            placeholder="Veuillez saisir le prix du voyage"
          />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
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

        <Button disabled={isSubmitting} mt="6">
          {schedule ? "Modifier l'horaire" : "Enregistrer l'horaire"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewScheduleForm;
