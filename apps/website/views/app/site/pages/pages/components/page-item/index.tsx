import {
  useAPIErrors,
  useCurrentApp,
  usePage,
  useSite,
  useTranslations,
} from "@/hooks";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Stack,
  Text,
  Title,
  useToast,
} from "@stokei/ui";

import { routes } from "@/routes";
import { useRouter } from "next/router";
import { useCreateVersionMutation } from "../../graphql/create-version.mutation.graphql.generated";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";

export interface PageItemProps {
  readonly page: SitePagesPageFragment;
}

export const PageItem = ({ page }: PageItemProps) => {
  const router = useRouter();
  const { site } = useSite();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const translate = useTranslations();
  const [{ fetching: isLoadingCreateVersion }, onExecuteCreateVersion] =
    useCreateVersionMutation();

  const onGoToEditPage = async () => {
    let version = "";
    try {
      const response = await onExecuteCreateVersion({
        input: {
          parent: page?.id || "",
        },
      });
      if (!!response?.data?.createVersion) {
        version = response?.data?.createVersion?.id;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
        return;
      }
    } catch (error) {
      onShowAPIError({ message: "sorryAnErrorOccurred" });
      return;
    }
    const editPageURL = routes
      .app({ appId: currentApp?.id })
      .site({ site: site?.id || "" })
      .page({ page: page?.id, version }).home;
    router.push(editPageURL);
  };
  return (
    <Card>
      <CardBody>
        <Stack
          align={["flex-start", "flex-start", "center", "center"]}
          justify={[
            "flex-start",
            "flex-start",
            "space-between",
            "space-between",
          ]}
          direction={["column", "column", "row", "row"]}
          spacing="2"
        >
          <Stack direction="column" spacing="1">
            <Title fontSize="medium">{page?.title}</Title>
            <Text fontSize="x-small">
              {translate.formatMessage({ id: "version" })}:{" "}
              {page?.version?.name}
            </Text>
          </Stack>
          {page?.id === site?.homePage?.id ? (
            <Badge>{translate.formatMessage({ id: "home" })}</Badge>
          ) : undefined}
          <Button
            onClick={onGoToEditPage}
            variant="ghost"
            isLoading={isLoadingCreateVersion}
          >
            {translate.formatMessage({ id: "edit" })}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};
