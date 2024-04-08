import { usePage, useTranslations } from "@/hooks";
import { Box, Button, Spacer, Stack } from "@stokei/ui";
import { UpdateVersionNameForm } from "../update-version-name-form";
import { useCallback } from "react";
import { useCreateNewVersion } from "../../hooks/use-create-new-version";
import { usePublishVersion } from "../../hooks/use-publish-version";

export const Header = () => {
  const translate = useTranslations();
  const { isProductionVersion, version } = usePage();
  const { isLoading: isLoadingCreateNewVersion, onCreateNewVersion } =
    useCreateNewVersion();
  const { isLoading: isLoadingPublishVersion, onPublishVersion } =
    usePublishVersion();

  const onCreateNewVersionOrPublishVersion = useCallback(() => {
    if (isProductionVersion) {
      return onCreateNewVersion();
    }
    return onPublishVersion(version?.id || "");
  }, [isProductionVersion, onCreateNewVersion, onPublishVersion, version?.id]);

  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      justify="space-between"
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <UpdateVersionNameForm />
      <Box flexDirection="column">
        <Button
          isLoading={isLoadingCreateNewVersion || isLoadingPublishVersion}
          onClick={onCreateNewVersionOrPublishVersion}
        >
          {translate.formatMessage({
            id: isProductionVersion ? "createNewVersion" : "publish",
          })}
        </Button>
      </Box>
    </Stack>
  );
};
