import { RecurringIntervalInput } from "@/components/recurring-interval-input";
import { useTranslations } from "@/hooks";
import {
  IntervalType,
  SubscriptionContractType,
} from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  DatePicker,
  DatePickerGroup,
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  Stack,
  Text,
} from "@stokei/ui";

interface PeriodStepProps {
  subscriptionType: SubscriptionContractType;
  interval: IntervalType;
  intervalCount: string;
  startAt?: Date;
  endAt?: Date;
  onChangeSubscriptionType: (data: SubscriptionContractType) => void;
  onChangeInterval: (data: IntervalType) => void;
  onChangeIntervalCount: (data: string) => void;
  onChangeStartAt: (data: Date) => void;
  onChangeEndAt: (data: Date) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const PeriodStep = ({
  subscriptionType,
  onChangeSubscriptionType,
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
}: PeriodStepProps) => {
  const translate = useTranslations();
  const isRecurring = subscriptionType === SubscriptionContractType.Recurring;

  return (
    <Stack direction="column" spacing="5">
      <FormControl isInvalid={!subscriptionType}>
        <Label htmlFor="price-type">
          {translate.formatMessage({ id: "period" })}
        </Label>
        <Select
          value={subscriptionType}
          onChooseItem={onChangeSubscriptionType}
          onRemoveChooseItem={onChangeSubscriptionType}
        >
          <SelectInput
            id="price-type"
            item={(item) => (
              <Text>
                {translate.formatMessage({
                  id:
                    item === SubscriptionContractType.OneTime
                      ? "lifelong"
                      : (convertEnumValueToCamelCase(item) as any),
                })}
              </Text>
            )}
          />
          <SelectList>
            <SelectItem value={SubscriptionContractType.OneTime}>
              <Text>{translate.formatMessage({ id: "lifelong" })}</Text>
            </SelectItem>
            <SelectItem value={SubscriptionContractType.Recurring}>
              <Text>{translate.formatMessage({ id: "recurring" })}</Text>
            </SelectItem>
          </SelectList>
        </Select>
      </FormControl>

      {isRecurring && (
        <RecurringIntervalInput
          interval={interval}
          intervalCount={intervalCount}
          onChangeInterval={onChangeInterval}
          onChangeIntervalCount={onChangeIntervalCount}
        />
      )}
      <Box flexDirection="column">
        <Label htmlFor="datepicker">
          {translate.formatMessage({ id: "intervalCount" })}
        </Label>
        <DatePickerGroup>
          <DatePicker
            id="datepicker-start-at"
            value={startAt ? startAt : new Date()}
            onChange={onChangeStartAt}
          />
          {isRecurring ? (
            <DatePicker
              id="datepicker-end-at"
              value={endAt ? endAt : new Date()}
              onChange={onChangeEndAt}
            />
          ) : (
            <Badge colorScheme="green">
              {translate.formatMessage({
                id: "lifelong",
              })}
            </Badge>
          )}
        </DatePickerGroup>
      </Box>

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={!intervalCount || !interval}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
