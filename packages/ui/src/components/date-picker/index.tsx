import { forwardRef, useMemo } from "react";
import ReactDatePicker from "react-datepicker";
import { useTranslations } from "../../hooks";
import { Box, BoxProps } from "../box";
import { Input } from "../input";

const DatePickerInput = forwardRef((props: any, ref) => (
  <Input width="full" {...props} ref={ref} />
));
DatePickerInput.displayName = "DatePickerInput";

export enum DatePickerType {
  DATE = "DATE",
  MONTH_YEAR = "MONTH_YEAR",
  YEAR = "YEAR",
}

export interface DatePickerProps extends Omit<BoxProps, "onChange"> {
  id?: string;
  value: Date;
  type?: DatePickerType;
  minDate?: Date;
  maxDate?: Date;
  isDisabled?: boolean;
  onChange: (data: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = forwardRef(
  (
    { id, isDisabled, value, minDate, maxDate, type, onChange, ...props },
    ref
  ) => {
    const translate = useTranslations();

    const config = useMemo(() => {
      const configs: Record<DatePickerType, any> = {
        [DatePickerType.DATE]: {
          dateFormat: translate.formatMessage({ id: "dateFormat" }),
        },
        [DatePickerType.YEAR]: {
          dateFormat: translate.formatMessage({ id: "yearFormat" }),
          showYearPicker: true,
        },
        [DatePickerType.MONTH_YEAR]: {
          dateFormat: translate.formatMessage({ id: "monthAndYearFormat" }),
          showMonthYearPicker: true,
          showFullMonthYearPicker: true,
        },
      };
      return configs?.[type || DatePickerType.DATE];
    }, [translate, type]);
    return (
      <Box width="full" position="relative" {...props}>
        <ReactDatePicker
          id={id}
          ref={ref as any}
          onChange={onChange}
          selected={value}
          disabled={isDisabled}
          popperClassName="date-picker-popper"
          calendarClassName="date-picker-calender"
          locale={translate.locale}
          customInput={<DatePickerInput />}
          minDate={minDate}
          maxDate={maxDate}
          {...config}
        />
      </Box>
    );
  }
);
DatePicker.displayName = "DatePicker";
