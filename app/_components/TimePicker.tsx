import { TextField } from "@radix-ui/themes";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

type Props = {
  dateTime: DateObject;
  setDateTime: (data: DateObject | null) => void;
};

const TimePickerComponent = ({ dateTime, setDateTime }: Props) => {
  return (
    <DatePicker
      disableDayPicker
      value={dateTime}
      onChange={(date) => {
        if (!Array.isArray(date)) setDateTime(date);
      }}
      format="HH:mm"
      plugins={[<TimePicker key="time-picker" position="bottom" />]}
      render={(value, openCalendar) => (
        <TextField.Root
          value={value}
          onClick={openCalendar} // opens the picker
          readOnly
          placeholder="Sélectionner une heure"
        />
      )}
    />
  );
};

export default TimePickerComponent;
