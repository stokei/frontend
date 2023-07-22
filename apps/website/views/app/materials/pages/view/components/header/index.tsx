import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Box, Button, Icon, Stack, useToast } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { useRemoveMaterialMutation } from "../../graphql/remove-material.mutation.graphql.generated";

interface HeaderProps {
  materialId: string;
}

export const Header: FC<HeaderProps> = ({ materialId }) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingRemoveMaterial }, onExecuteRemoveMaterial] =
    useRemoveMaterialMutation();

  const onGoToMaterialsPage = useCallback(() => {
    return router.push(
      routes.app({ appId: currentApp?.id || "" }).materials.home
    );
  }, [currentApp?.id, router]);

  const onRemoveMaterial = useCallback(async () => {
    try {
      const response = await onExecuteRemoveMaterial({
        input: {
          where: {
            material: materialId,
          },
        },
      });
      if (!!response?.data?.removeMaterial) {
        onShowToast({
          title: translate.formatMessage({ id: "removedSuccessfully" }),
          status: "success",
        });

        onGoToMaterialsPage();
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  }, [
    materialId,
    onExecuteRemoveMaterial,
    onGoToMaterialsPage,
    onShowAPIError,
    onShowToast,
    translate,
  ]);

  return (
    <Stack
      justify={["flex-start", "flex-start", "space-between", "space-between"]}
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Box>
        <Button
          size="sm"
          variant="link"
          leftIcon={<Icon name="back" />}
          onClick={onGoToMaterialsPage}
        >
          {translate.formatMessage({ id: "back" })}
        </Button>
      </Box>
      <Button
        variant="link"
        colorScheme="red"
        onClick={onRemoveMaterial}
        isLoading={isLoadingRemoveMaterial}
      >
        {translate.formatMessage({ id: "removeMaterial" })}
      </Button>
    </Stack>
  );
};
