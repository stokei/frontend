import { useTranslations } from "@/hooks";
import { IntervalType } from "@/services/graphql/stokei";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  Stack,
  Text,
} from "@stokei/ui";
import { FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface RecurringIntervalInputProps {
  readonly label?: string;
  readonly interval: IntervalType;
  readonly intervalCount: string;
  readonly onChangeInterval: (data: IntervalType) => void;
  readonly onChangeIntervalCount: (data: string) => void;
}

export const RecurringIntervalInput: FC<RecurringIntervalInputProps> = ({
  label,
  interval,
  intervalCount,
  onChangeInterval,
  onChangeIntervalCount: onChangeIntervalCountProp,
}) => {
  const translate = useTranslations();
  const validationSchema = z.object({
    intervalCount: z.string().min(1, {
      message: translate.formatMessage({ id: "intervalCountIsRequired" }),
    }),
  });

  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const isPluralIntervalCount = useMemo(
    () => intervalCount && intervalCount !== "1",
    [intervalCount]
  );

  const justNumbers = useCallback((value: string) => {
    if (!value) {
      return 0;
    }
    const valueWithoutNumbers = (value + "")?.trim()?.replace(/\D/g, "");
    return valueWithoutNumbers ? parseInt(valueWithoutNumbers) : 0;
  }, []);

  const onChangeIntervalCount = (event: any) => {
    const value = justNumbers(event.target.value);
    event.target.value = value || "";
    onChangeIntervalCountProp(event.target.value);
    return event;
  };

  return (
    <FormControl isInvalid={!!errors?.intervalCount}>
      <Stack direction="row" spacing="5" align="flex-end">
        <Stack direction="column" spacing="0">
          <Label htmlFor="intervalCount">
            {label || translate.formatMessage({ id: "period" })}
          </Label>
          <InputGroup>
            <Input
              id="intervalCount"
              type="tel"
              placeholder={translate.formatMessage({ id: "period" })}
              {...register("intervalCount", {
                onChange: onChangeIntervalCount,
              })}
            />
          </InputGroup>
        </Stack>
        <Select
          value={interval}
          onChooseItem={onChangeInterval}
          onRemoveChooseItem={onChangeInterval}
        >
          <SelectInput
            id="price-interval"
            item={(currentInterval) => (
              <Text>
                {translate.formatMessage({
                  id: (isPluralIntervalCount
                    ? `${currentInterval}s`
                    : currentInterval
                  )?.toLowerCase() as any,
                })}
              </Text>
            )}
          />
          <SelectList>
            <SelectItem value={IntervalType.Day}>
              <Text>
                {translate.formatMessage({
                  id: isPluralIntervalCount ? "days" : "day",
                })}
              </Text>
            </SelectItem>
            <SelectItem value={IntervalType.Week}>
              <Text>
                {translate.formatMessage({
                  id: isPluralIntervalCount ? "weeks" : "week",
                })}
              </Text>
            </SelectItem>
            <SelectItem value={IntervalType.Month}>
              <Text>
                {translate.formatMessage({
                  id: isPluralIntervalCount ? "months" : "month",
                })}
              </Text>
            </SelectItem>
            <SelectItem value={IntervalType.Year}>
              <Text>
                {translate.formatMessage({
                  id: isPluralIntervalCount ? "years" : "year",
                })}
              </Text>
            </SelectItem>
          </SelectList>
        </Select>
      </Stack>
      <FormErrorMessage>{errors?.intervalCount?.message}</FormErrorMessage>
    </FormControl>
  );
};
