import { useTranslations } from "@/hooks";
import { Stack, Title } from "@stokei/ui";

interface HeaderProps {
  readonly materialsTotalCount: number;
}

export const Header = ({ materialsTotalCount }: HeaderProps) => {
  const translate = useTranslations();

  return (
    <Stack align="center" direction="row" spacing="2">
      <Title fontSize="sm">
        {translate.formatMessage({ id: "total" })}: {materialsTotalCount || 0}
      </Title>
    </Stack>
  );
};
