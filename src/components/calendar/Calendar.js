import {
  usePickerLayout,
  PickersLayoutRoot,
  PickersLayoutContentWrapper,
} from "@mui/x-date-pickers/PickersLayout";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setSelectedDate } from "../../redux/slice/AuthSlice";
import "./Calender.css";

function MyCustomLayout(props) {
  const { toolbar, tabs, content } = usePickerLayout(props);

  return (
    <PickersLayoutRoot className="calender" ownerState={props}>
      {toolbar}
      <PickersLayoutContentWrapper className="calender-content">
        {tabs}
        {content}
      </PickersLayoutContentWrapper>
    </PickersLayoutRoot>
  );
}

export default function AddComponent() {
  const dispatch = useDispatch();
  const handleSelectDate = (data) => {
    dispatch(setSelectedDate(data));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="portrait"
        defaultValue={dayjs()}
        slots={{
          layout: MyCustomLayout,
        }}
        slotProps={{
          toolbar: {
            toolbarFormat: "ddd DD MMMM",
            hidden: false,
          },
        }}
        onChange={(data) => {
          handleSelectDate(data);
        }}
      />
    </LocalizationProvider>
  );
}
