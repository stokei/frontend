import { useTranslations } from "@/hooks";
import { Stack, Title } from "@stokei/ui";
import { FC } from "react";

interface HeaderProps {
  readonly materialsTotalCount: number;
}

export const Header: FC<HeaderProps> = ({ materialsTotalCount }) => {
  const translate = useTranslations();

  return (
    <Stack align="center" direction="row" spacing="2">
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {materialsTotalCount || 0}
      </Title>
    </Stack>
  );
};
