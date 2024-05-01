import { useToast } from "@stokei/ui";
import { useCallback } from "react";
import { useTranslations } from "../use-translations";

export const useAPIErrors = () => {
  const translate = useTranslations();
  const { onShowToast } = useToast();

  const onShowAPIError = useCallback(
    ({ message }: { message?: string }) => {
      if (!message) {
        return;
      }
      onShowToast({
        title: translate.formatMessage({ id: message as any }) || message,
        status: "error",
      });
    },
    [onShowToast, translate]
  );
  return {
    onShowAPIError,
  };
};
