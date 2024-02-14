import { useCurrentApp, useTranslations } from "@/hooks";
import { Button, Icon, Spacer, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";

interface HeaderProps {
  readonly totalCount: number;
}

export const Header: FC<HeaderProps> = ({ totalCount }) => {
  const router = useRouter();
  const { currentApp, hasPaymentIntegrations } = useCurrentApp();
  const translate = useTranslations();

  return (
    <Stack
      align={["flex-start", "flex-start", "center", "center"]}
      direction={["column", "column", "row", "row"]}
      spacing="2"
    >
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {totalCount || 0}
      </Title>
      <Spacer />
      <Button
        leftIcon={<Icon name="plus" />}
        onClick={() => {}}
        isDisabled={!hasPaymentIntegrations}
      >
        {translate.formatMessage({ id: "add" })}
      </Button>
    </Stack>
  );
};
