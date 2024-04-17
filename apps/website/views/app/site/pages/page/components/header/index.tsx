import { usePage, useSite, useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { Button, Link, Stack } from "@stokei/ui";
import { useCallback, useMemo } from "react";
import { useCreateNewVersion } from "../../hooks/use-create-new-version";
import { usePublishVersion } from "../../hooks/use-publish-version";
import { UpdateVersionNameForm } from "../update-version-name-form";

export const Header = () => {
  const translate = useTranslations();
  const { site } = useSite();
  const { isProductionVersion, version, page } = usePage();
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

  const pageViewURL = useMemo(() => {
    return (site?.defaultDomain?.url || "") + appRoutes.customPage({ slug: page?.slug || "" }).home;
  }, [page?.slug, site])

  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      justify="space-between"
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <UpdateVersionNameForm />
      <Stack
        width="fit-content"
        align="center"
        direction="row"
        spacing="5"
      >
        {isProductionVersion && (
          <Link
            target="_blank"
            href={pageViewURL}
          >
            {translate.formatMessage({
              id: "viewPage",
            })}
          </Link>
        )}
        <Button
          isLoading={isLoadingCreateNewVersion || isLoadingPublishVersion}
          onClick={onCreateNewVersionOrPublishVersion}
        >
          {translate.formatMessage({
            id: isProductionVersion ? "createNewVersion" : "publish",
          })}
        </Button>
      </Stack>
    </Stack>
  );
};
