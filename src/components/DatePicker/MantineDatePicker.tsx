import { useState } from "react";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { MantineSize } from "@mantine/core";
import "./DatePicker.css";

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
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(),
    new Date(),
  ]);

  return (
    <div className="w-full">
      <DateRangePicker
        classNames={{
          input: "w-full",
          dropdown: "text-xs bg-primary-400 h-fit border-none",
          cell: "",
          day: "text-sm h-8 hover:bg-primary-300 date__custom_styles date__in_range date__both_ends",
          weekday: "text-cta-dark",
          month: "text-cta-dark",
          calendarHeaderControl: "hover:bg-primary-300",
          calendarHeaderLevel: "hover:bg-primary-300",

          monthPickerControl: "hover:bg-primary-300",
          yearPickerControl: "hover:bg-primary-300",
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
