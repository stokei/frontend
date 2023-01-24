import { useCallback } from "react";
import { useIntl } from "react-intl";

export const useTranslations = <TKeys = string>() => {
  const intl = useIntl();

  const formatMessage = useCallback(
    ({ id }: { id: TKeys }, values?: Record<string, any>) => {
      return intl.formatMessage({ id: id as any }, values);
    },
    []
  );

  const formatDate = useCallback(
    (date: Parameters<Intl.DateTimeFormat["format"]>[0]) => {
      return intl.formatDate(date);
    },
    []
  );

  const formatTime = useCallback(
    (time: Parameters<Intl.DateTimeFormat["format"]>[0]) => {
      return intl.formatTime(time);
    },
    []
  );

  return { formatMessage, formatDate, formatTime };
};
