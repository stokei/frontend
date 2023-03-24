import { useCallback } from "react";
import { useIntl } from "react-intl";
import { secondsToTime } from "../../utils/seconds-to-time";

export const useTranslations = <TKeys = string>() => {
  const intl = useIntl();

  const formatMessage = useCallback(
    ({ id }: { id: TKeys }, values?: Record<string, any>) => {
      try {
        return intl.formatMessage({ id: id as any }, values);
      } catch (error) {
        return "";
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
      minorUnit?: number;
    }) => {
      if (!amount || !minorUnit || minorUnit < 0) {
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
    (
      date: Parameters<Intl.DateTimeFormat["format"]>[0] | string,
      options?: Intl.DateTimeFormatOptions & { format?: string }
    ) => {
      if (!date) {
        return;
      }
      try {
        return intl.formatDate(date, options);
      } catch (error) {
        return undefined;
      }
    },
    []
  );

  const formatDateTime = useCallback(
    (
      time: Parameters<Intl.DateTimeFormat["format"]>[0] | string,
      options?: Intl.DateTimeFormatOptions & { format?: string }
    ) => {
      try {
        if (typeof time === "number") {
          if (time <= 0) {
            return "00:00";
          }
        }
        return intl.formatTime(time, options);
      } catch (error) {
        return;
      }
    },
    []
  );

  const formatTime = useCallback((seconds: number) => {
    try {
      return secondsToTime(seconds);
    } catch (error) {
      return;
    }
  }, []);

  return {
    locale: intl.locale,
    formatMessage,
    formatMoney,
    formatDate,
    formatTime,
    formatDateTime,
  };
};
