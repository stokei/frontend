import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { useTranslations } from "../../hooks";
import { Box, BoxProps } from "../box";
import { Input } from "../input";

const DatePickerInput = forwardRef((props: any, ref) => (
  <Input width="full" {...props} ref={ref} />
));
DatePickerInput.displayName = "DatePickerInput";

export interface DatePickerProps extends Omit<BoxProps, "onChange"> {
  id?: string;
  value: Date;
  isDisabled?: boolean;
  onChange: (data: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = forwardRef(
  ({ id, isDisabled, value, onChange, ...props }, ref) => {
    const translate = useTranslations();
    return (
      <Box width="full" {...props}>
        <ReactDatePicker
          id={`${id}-date-picker`}
          ref={ref as any}
          onChange={onChange}
          selected={value}
          disabled={isDisabled}
          popperClassName="date-picker-popper"
          calendarClassName="date-picker-calender"
          locale={translate.locale}
          customInput={<DatePickerInput />}
          dateFormat={translate.formatMessage({ id: "dateFormat" })}
        />
      </Box>
    );
  }
);
DatePicker.displayName = "DatePicker";
