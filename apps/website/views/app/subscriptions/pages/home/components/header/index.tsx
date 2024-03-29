import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";

interface HeaderProps {
  readonly subscriptionContractTotalCount: number;
  readonly onOpenFilters: () => void;
}

export const Header: FC<HeaderProps> = ({
  subscriptionContractTotalCount,
  onOpenFilters,
}) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const onGoToAddSubscriptionPage = () => {
    return router.push(
      routes.app({ appId: currentApp?.id || "" }).subscriptions.add
    );
  };
  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}:{" "}
        {subscriptionContractTotalCount || 0}
      </Title>
      <Spacer />
      <Button
        variant="ghost"
        leftIcon={<Icon name="filters" />}
        onClick={onOpenFilters}
      >
        {translate.formatMessage({ id: "filters" })}
      </Button>
      <Button
        leftIcon={<Icon name="plus" />}
        onClick={onGoToAddSubscriptionPage}
      >
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
