import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  convertToISODate,
} from "@stokei/utils";
import { IntervalType } from "@/services/graphql/stokei";

export const getEndDate = ({
  startAt,
  interval,
  intervalCount,
}: {
  startAt: Date;
  interval: IntervalType;
  intervalCount: number;
}): Date => {
  const startDate = convertToISODate(startAt);
  const getDateHandler = {
    [IntervalType.Day]: addDays,
    [IntervalType.Week]: addWeeks,
    [IntervalType.Month]: addMonths,
    [IntervalType.Year]: addYears,
  };
  return getDateHandler[interval]?.(intervalCount, startDate);
};
