import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useTranslations } from "../../hooks";

export interface DatePickerProps {
  id?: string;
  value: Date;
  isDisabled?: boolean;
  onChange: (data: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  isDisabled,
  value,
  onChange,
  ...props
}) => {
  const translate = useTranslations();

  return (
    <SingleDatepicker
      id={`${id}-date-picker`}
      onDateChange={onChange}
      date={value}
      configs={{
        dateFormat: translate.formatMessage({ id: "dateFormat" }),
      }}
      propsConfigs={{
        dateNavBtnProps: {
          colorScheme: "primary",
          variant: "outline",
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            borderColor: "primary.300",
            _hover: {
              background: "primary.400",
            },
          },
          isInRangeBtnProps: {
            background: "primary.200",
            color: "primary.900",
          },
          selectedBtnProps: {
            background: "primary.200",
            color: "primary.900",
          },
          todayBtnProps: {
            background: "primary.200",
            color: "primary.900",
          },
        },
        inputProps: {
          size: "md",
        },
        popoverCompProps: {
          popoverContentProps: {
            background: "gray.200",
            color: "primary.500",
          },
        },
      }}
    />
  );
};
