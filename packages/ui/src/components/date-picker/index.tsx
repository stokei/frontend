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
      usePortal
      configs={{
        dateFormat: translate.formatMessage({ id: "dateFormat" }),
      }}
      propsConfigs={{
        dateNavBtnProps: {
          colorScheme: "primary",
          variant: "ghost",
        },
        dayOfMonthBtnProps: {
          defaultBtnProps: {
            borderColor: "primary.900",
            _hover: {
              background: "primary.500",
            },
          },
          isInRangeBtnProps: {
            background: "primary.500",
            color: "primary.900",
          },
          selectedBtnProps: {
            background: "primary.500",
            color: "primary.900",
          },
          todayBtnProps: {
            background: "primary.100",
            color: "primary.900",
          },
        },
        inputProps: {
          size: "md",
        },
        popoverCompProps: {
          popoverContentProps: {
            padding: 0,
            background: "background.50",
            color: "text.500",
          },
        },
      }}
    />
  );
};
