import { useCallback } from "react";
import { useIntl } from "react-intl";

export const useTranslations = <TKeys = string>() => {
  const intl = useIntl();

  const formatMessage = useCallback(
    ({ id }: { id: TKeys }, values?: Record<string, any>) => {
      try {
        return intl.formatMessage({ id: id as any }, values);
      } catch (error) {
        return undefined;
      }
    },
    []
  );

  const formatMoney = useCallback(
    ({
      currency,
      amount,
      minorUnit,
    }: {
      currency: string;
      amount: number;
      minorUnit: number;
    }) => {
      if (!amount || minorUnit < 0) {
        return;
      }
      try {
        return new Intl.NumberFormat(intl.locale, {
          currency,
        }).format(amount / Math.pow(10, minorUnit));
      } catch (error) {
        return undefined;
      }
    },
    []
  );

  const formatDate = useCallback(
    (date: Parameters<Intl.DateTimeFormat["format"]>[0]) => {
      if (!date) {
        return;
      }
      try {
        return intl.formatDate(date);
      } catch (error) {
        return undefined;
      }
    },
    []
  );

  const formatTime = useCallback(
    (time: Parameters<Intl.DateTimeFormat["format"]>[0]) => {
      try {
        if (typeof time === "number") {
          if (time < 0) {
            return "00:00";
          }
          const date = new Date();
          date.setTime(time);
          return intl.formatTime(date);
        }
        return time && intl.formatTime(time);
      } catch (error) {
        return;
      }
    },
    []
  );

  return { formatMessage, formatMoney, formatDate, formatTime };
};
