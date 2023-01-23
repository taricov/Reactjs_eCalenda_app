import { createContext, useContext, useState } from "react";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { MantineSize } from "@mantine/core";
// import "./DatePicker.css";
import dayjs from "dayjs";

import { useAtom } from "jotai";
import { calendarDate, PickerDate } from "../../store/jotai";
import moment from "moment";
// import { dateRangePicker } from "../../store/jotai";

interface Props {
  placeholder?: string;
  label?: string;
  size?: MantineSize | undefined;
  desc?: string;
}

const SiteCompDatePicker = ({
  label,

  placeholder,
  size = "sm",
  desc,
}: Props) => {
  // let dateObj = useContext(formContext);
  // const [pickerDates, setPickerDates] = useState<DateRangePickerValue>([
  //   dateObj.startYear !== undefined
  //     ? new Date(dateObj.startYear, dateObj.startMonth - 1, dateObj.startDay)
  //     : new Date(),
  //   dateObj.endYear !== undefined
  //     ? new Date(dateObj.endYear, dateObj.endMonth - 1, dateObj.endDay - 1)
  //     : new Date(),
  // ]);
  // const [selectedDateRangePicker, setSelectedDateRangePicker] =
  //   useAtom(dateRangePicker);
  // const handleSelectedDateRangePicker = () => {
  //   setPickerDates;
  //   setSelectedDateRangePicker(pickerDates);
  // };
  // console.log(pickerDates[1]);

  const [datePicker, pickerHandler] = useAtom(PickerDate);
  const [c, calendarHandler] = useAtom(calendarDate);
  // console.log("fromPicker", datePicker);

  const datePicked = (e: any) => {
    pickerHandler(e);
    calendarHandler([
      moment(e[0]).format("YYYY-MM-DD"),
      moment(e[1]).format("YYYY-MM-DD"),
    ]);
    console.log("cal", c);
  };
  return (
    <div className="w-full">
      <DateRangePicker
        modalZIndex={2000}
        firstDayOfWeek="sunday"
        weekendDays={[5, 6]}
        excludeDate={(date) => date.getDay() === 5 || date.getDay() === 6}
        minDate={undefined}
        maxDate={undefined}
        // range={[startDate, endDate]}
        dropdownType="modal"
        classNames={{
          calendarBase: "flex sm:flex-row flex-col w-fit",
          input: "w-full",
          // dropdown: "text-xs bg-app-color-400 h-fit border-none",
          cell: "",
          day: "data-[first-in-range=true]:!text-app-color-100 data-[first-in-range=true]:!bg-app-color-500 data-[first-in-range=true]:!bg-opacity-100 data-[last-in-range=true]:!text-app-color-100 data-[last-in-range=true]:!bg-app-color-500 data-[last-in-range=true]:!bg-opacity-100 data-[selected=true]:bg-app-color-500 data-[in-range=true]:bg-app-color-50 data-[in-range=true]:!bg-opacity-5 text-sm h-8 hover:bg-app-color-500 hover:bg-opacity-5",
          weekday: "text-app-color-400 dark:!text-app-color-100 text-sm",
          month: "text-app-color-500",
          calendarHeaderControl: "hover:bg-app-color-50 hover:bg-opacity-10",
          calendarHeaderLevel: "hover:bg-app-color-50 hover:bg-opacity-10",
          monthPickerControl: "hover:bg-app-color-50 hover:bg-opacity-10",
          yearPickerControl: "hover:bg-app-color-50 hover:bg-opacity-10",
        }}
        variant="unstyled"
        label={label}
        size={size}
        withAsterisk
        description={desc}
        placeholder={placeholder}
        amountOfMonths={2}
        value={datePicker}
        onChange={datePicked}
      />
    </div>
  );
};

export default SiteCompDatePicker;
