import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  convertToISODate,
} from "@stokei/utils";
import { IntervalType } from "@/services/graphql/stokei";

export const getStartDate = ({
  endAt,
  interval,
  intervalCount,
}: {
  endAt: Date;
  interval: IntervalType;
  intervalCount: number;
}): Date => {
  const endDate = convertToISODate(endAt);
  const getDateHandler = {
    [IntervalType.Day]: addDays,
    [IntervalType.Week]: addWeeks,
    [IntervalType.Month]: addMonths,
    [IntervalType.Year]: addYears,
  };
  return getDateHandler[interval]?.(-1 * intervalCount, endDate);
};
