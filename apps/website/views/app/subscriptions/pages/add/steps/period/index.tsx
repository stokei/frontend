import { RecurringIntervalInput } from "@/components/recurring-interval-input";
import { useTranslations } from "@/hooks";
import { IntervalType } from "@/services/graphql/stokei";
import {
  Box,
  Button,
  ButtonGroup,
  DatePicker,
  DatePickerGroup,
  Label,
  Stack,
} from "@stokei/ui";
import { FC } from "react";

interface PeriodStepProps {
  interval: IntervalType;
  intervalCount: string;
  startAt?: Date;
  endAt?: Date;
  onChangeInterval: (data: IntervalType) => void;
  onChangeIntervalCount: (data: string) => void;
  onChangeStartAt: (data: Date) => void;
  onChangeEndAt: (data: Date) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const PeriodStep: FC<PeriodStepProps> = ({
  interval,
  intervalCount,
  startAt,
  endAt,
  onChangeStartAt,
  onChangeEndAt,
  onChangeInterval,
  onChangeIntervalCount,
  onPreviousStep,
  onNextStep,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <RecurringIntervalInput
        interval={interval}
        intervalCount={intervalCount}
        onChangeInterval={onChangeInterval}
        onChangeIntervalCount={onChangeIntervalCount}
      />

      <Box flexDirection="column">
        <Label htmlFor="datepicker">
          {translate.formatMessage({ id: "startDate" })}
        </Label>
        <DatePickerGroup>
          <DatePicker
            id="datepicker-start-at"
            value={startAt ? startAt : new Date()}
            onChange={onChangeStartAt}
          />
          <DatePicker
            id="datepicker-end-at"
            value={endAt ? endAt : new Date()}
            onChange={onChangeEndAt}
          />
        </DatePickerGroup>
      </Box>

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
