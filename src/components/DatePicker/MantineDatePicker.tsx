import { useContext, useState } from "react";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { MantineSize } from "@mantine/core";
import "./DatePicker.css";
import dayjs from "dayjs";
import { selectedDateRange } from "../FullCal";

interface Props {
  label: string;
  placeholder: string;
  size?: MantineSize | undefined;
  desc?: string;
}

const SiteCompDatePicker = ({
  label,

  placeholder,
  size = "sm",
  desc,
}: Props) => {
  let dateObj = useContext(selectedDateRange);

  const [value, setValue] = useState<DateRangePickerValue>([
    dateObj.startYear !== undefined
      ? new Date(dateObj.startYear, dateObj.startMonth - 1, dateObj.startDay)
      : new Date(),
    dateObj.endYear !== undefined
      ? new Date(dateObj.endYear, dateObj.endMonth - 1, dateObj.endDay)
      : new Date(),
  ]);

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
          dropdown: "text-xs bg-app-color-400 h-fit border-none",
          cell: "",
          day: "text-sm h-8 hover:bg-app-color-300  date__custom_styles date__in_range date__both_ends",
          weekday: "text-app-color-700 dark:!text-app-color-100 text-sm",
          month: "text-app-color-500",
          calendarHeaderControl: "hover:bg-app-color-300",
          calendarHeaderLevel: "hover:bg-app-color-300",
          monthPickerControl: "hover:bg-app-color-300",
          yearPickerControl: "hover:bg-app-color-300",
        }}
        variant="unstyled"
        label={label}
        size={size}
        withAsterisk
        description={desc}
        placeholder={placeholder}
        amountOfMonths={2}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default SiteCompDatePicker;
