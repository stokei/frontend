import { useAPIErrors, useCurrentApp, usePage, useTranslations } from "@/hooks";
import { ComponentsTree } from "@/services/axios/models/components-tree";
import { createAxiosAPIClient } from "@/services/clients/axios";
import { ComponentType } from "@/services/graphql/stokei";
import { Button, Container, useToast } from "@stokei/ui";
import { AxiosError } from "axios";

export const Teste = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { version } = usePage();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const createComponents = async () => {
    try {
      const response = await new ComponentsTree(
        createAxiosAPIClient({
          appId: currentApp?.id,
        }).apiClient
      ).create({
        tree: [
          {
            parent: version?.id || "",
            type: ComponentType.Stack,
            components: [
              {
                parent: "",
                type: ComponentType.Button,
                data: {
                  pageId: "page_clt50qmnp0003ma1iqqj7ug4k",
                  text: "Clica aqui patrão",
                },
                components: [],
              },
            ],
          },
        ],
      });
      if (!!response) {
        onShowToast({
          title: translate.formatMessage({ id: "addedSuccessfully" }),
          status: "success",
        });
        return;
      }
    } catch (e) {
      const error = e as AxiosError<Error>;
      onShowAPIError({ message: error?.response?.data?.message });
    }
  };

  return (
    <Container paddingY="5">
      <Button onClick={createComponents}>Agora vai</Button>
    </Container>
  );
};
