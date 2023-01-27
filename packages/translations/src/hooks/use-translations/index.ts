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

  const formatDate = useCallback(
    (date: Parameters<Intl.DateTimeFormat["format"]>[0]) => {
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
        return intl.formatTime(time);
      } catch (error) {
        return undefined;
      }
    },
    []
  );

  return { formatMessage, formatDate, formatTime };
};
