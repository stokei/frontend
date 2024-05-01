import { NavbarUserInformation, SidebarOpenButton } from "@/components";
import { useComponentsTree, useTranslations } from "@/hooks";
import { Navbar as NavbarUI, Spacer, Text } from "@stokei/ui";

export const Navbar = () => {
  const { isSavingComponents } = useComponentsTree();
  const translate = useTranslations();
  return (
    <NavbarUI
      align="center"
      background="background.50"
      borderBottomWidth="thin"
    >
      <SidebarOpenButton />
      {isSavingComponents && (
        <Text fontSize="x-small">
          {translate.formatMessage({ id: "saving" })}
        </Text>
      )}
      <Spacer />
      <NavbarUserInformation />
    </NavbarUI>
  );
};
