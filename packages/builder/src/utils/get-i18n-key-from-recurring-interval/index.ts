type RecurringIntervalType = "DAY" | "WEEK" | "MONTH" | "YEAR";
interface GetI18nKeyFromRecurringIntervalResponse {
  singular: string;
  plural: string;
}

export const getI18nKeyFromRecurringInterval = (
  recurringInterval: RecurringIntervalType
): GetI18nKeyFromRecurringIntervalResponse => {
  const recurringIntervals: Record<
    RecurringIntervalType,
    GetI18nKeyFromRecurringIntervalResponse
  > = {
    DAY: {
      singular: "day",
      plural: "days",
    },
    WEEK: {
      singular: "week",
      plural: "weeks",
    },
    MONTH: {
      singular: "month",
      plural: "months",
    },
    YEAR: {
      singular: "year",
      plural: "years",
    },
  };
  return recurringIntervals[recurringInterval];
};
