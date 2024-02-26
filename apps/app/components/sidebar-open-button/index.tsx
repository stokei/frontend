import { useSidebar, useTranslations } from "@/hooks";
import { Button, Icon, IconButtonProps, Stack, Text } from "@stokei/ui";

interface SidebarOpenButtonProps extends Omit<IconButtonProps, "name"> {}

export const SidebarOpenButton = ({ ...props }: SidebarOpenButtonProps) => {
  const translate = useTranslations();
  const { onToggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      onClick={onToggleSidebar}
      display={["block", "block", "none", "none"]}
      marginLeft="-4"
      {...props}
    >
      <Stack
        width="fit-content"
        direction="row"
        align="center"
        justify="center"
        spacing="3"
      >
        <Icon name="menu" />
        <Text color="inherit">{translate.formatMessage({ id: "menu" })}</Text>
      </Stack>
    </Button>
  );
};
