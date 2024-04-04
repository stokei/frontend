import { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { secondsToTime } from "../../utils/seconds-to-time";
import {
  FormatDate,
  FormatDateTime,
  FormatMessage,
  FormatMoney,
  FormatMoneyToNumber,
  FormatNumber,
  FormatTime,
  Translations,
} from "./types";

export const useTranslations = <TKeys = string>(): Translations<TKeys> => {
  const intl = useIntl();

  const formatMessage: FormatMessage<TKeys> = useCallback(
    ({ id }, values) => {
      try {
        return intl.formatMessage({ id: id as any }, values);
      } catch (error) {
        return "";
      }
    },
    [intl]
  );

  const formatMoney: FormatMoney = useCallback(
    ({ currency, amount, minorUnit, showSymbol = false }) => {
      const valueAmount = amount ? amount / Math.pow(10, minorUnit || 0) : 0;
      try {
        return new Intl.NumberFormat(intl.locale, {
          ...(showSymbol && { style: "currency" }),
          currency,
          minimumFractionDigits: minorUnit,
          maximumFractionDigits: 10,
        }).format(valueAmount);
      } catch (error) {
        return "0";
      }
    },
    [intl]
  );

  const formatMoneyToNumber: FormatMoneyToNumber = useCallback((money) => {
    if (!money) {
      return 0;
    }
    const justNumbers = money?.trim()?.replace(/\D/g, "");
    return justNumbers ? parseFloat(justNumbers) : 0;
  }, []);

  const formatNumber: FormatNumber = useCallback(
    (value) => {
      if (!value) {
        return "0";
      }
      return intl.formatNumber(value, {
        unitDisplay: "long",
      });
    },
    [intl]
  );

  const formatDateTime: FormatDateTime = useCallback(
    (time, options) => {
      try {
        if (typeof time === "number") {
          if (time <= 0) {
            return "00:00";
          }
        }
        return intl.formatTime(time, options);
      } catch (error) {
        return "";
      }
    },
    [intl]
  );

  const formatDate: FormatDate = useCallback(
    (date, options) => {
      if (!date) {
        return "";
      }
      try {
        const dateString = intl.formatDate(date, options);
        const timeString = options?.fullDate ? formatDateTime(date) : "";
        return `${dateString} ${timeString}`;
      } catch (error) {
        return "";
      }
    },
    [intl, formatDateTime]
  );

  const formatTime: FormatTime = useCallback((seconds) => {
    try {
      return secondsToTime(seconds);
    } catch (error) {
      return "";
    }
  }, []);

  return {
    locale: intl.locale,
    formatNumber,
    formatMessage,
    formatMoney,
    formatDate,
    formatTime,
    formatDateTime,
    formatMoneyToNumber,
  };
};
