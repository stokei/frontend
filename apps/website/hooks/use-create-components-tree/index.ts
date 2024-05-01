import {
  ComponentsTree,
  CreateComponentsTreeData,
} from "@/services/axios/models/components-tree";
import { createAxiosAPIClient } from "@/services/clients/axios";
import { useTranslations } from "@stokei/translations";
import { useToast } from "@stokei/ui";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useAPIErrors } from "../use-api-errors";
import { useCurrentApp } from "../use-current-app";

export const useCreateComponentsTree = () => {
  const [isLoading, setIsLoading] = useState(false);
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const onCreateComponentsTree = useCallback(
    async (data: CreateComponentsTreeData) => {
      setIsLoading(true);
      try {
        const response = await new ComponentsTree(
          createAxiosAPIClient({
            appId: currentApp?.id,
          }).apiClient
        ).create(data);
        if (!!response) {
          onShowToast({
            title: translate.formatMessage({ id: "addedSuccessfully" }),
            status: "success",
          });
          setIsLoading(false);
          return response;
        }
      } catch (e) {
        setIsLoading(false);
        const error = e as AxiosError<Error>;
        onShowAPIError({ message: error?.response?.data?.message });
      }
    },
    [currentApp?.id, onShowAPIError, onShowToast, translate]
  );

  return {
    isLoading,
    onCreateComponentsTree,
  };
};
