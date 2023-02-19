import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { onLogout } from "@/utils";
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Stack,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { NavbarUserInformationDrawerButton } from "../user-information-drawer-button";

export interface NavbarUserInformationDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
}
export const NavbarUserInformationDrawer: FC<
  NavbarUserInformationDrawerProps
> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { currentAccount } = useCurrentAccount();
  const translate = useTranslations();

  return (
    <Drawer isOpen={!!isOpen} onClose={onClose}>
      <DrawerHeader>
        <Stack direction="column" spacing="3" align="center">
          <Avatar
            name={currentAccount?.fullname}
            src={currentAccount?.avatar?.file?.url || ""}
          />
          <Text fontWeight="bold">{currentAccount?.fullname}</Text>
        </Stack>
      </DrawerHeader>
      <DrawerBody>
        <Stack direction="column" spacing="2">
          <NavbarUserInformationDrawerButton>
            {translate.formatMessage({ id: "profile" })}
          </NavbarUserInformationDrawerButton>
          <NavbarUserInformationDrawerButton>
            {translate.formatMessage({ id: "settings" })}
          </NavbarUserInformationDrawerButton>
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <Stack direction="column" spacing="1">
          <NavbarUserInformationDrawerButton onClick={onLogout}>
            {translate.formatMessage({ id: "logout" })}
          </NavbarUserInformationDrawerButton>
        </Stack>
      </DrawerFooter>
    </Drawer>
  );
};
