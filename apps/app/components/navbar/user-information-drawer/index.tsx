import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { onLogout } from "@/utils";
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Icon,
  Stack,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { NavbarUserInformationDrawerButton } from "../user-information-drawer-button";
import { appRoutes } from "@stokei/routes";

export interface NavbarUserInformationDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
}
export const NavbarUserInformationDrawer = ({
  isOpen,
  onClose,
}: NavbarUserInformationDrawerProps) => {
  const router = useRouter();
  const { currentAccount, homePageURL } = useCurrentAccount();
  const translate = useTranslations();

  const onRedirectToURLAndCloseModal = useCallback(
    (url: string) => {
      onClose?.();
      return router.push(url);
    },
    [onClose, router]
  );

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
          <NavbarUserInformationDrawerButton
            leftIcon={<Icon name="home" />}
            onClick={() => onRedirectToURLAndCloseModal(homePageURL || "")}
          >
            {translate.formatMessage({ id: "home" })}
          </NavbarUserInformationDrawerButton>
          <NavbarUserInformationDrawerButton
            leftIcon={<Icon name="store" />}
            onClick={() => onRedirectToURLAndCloseModal(appRoutes.store.home)}
          >
            {translate.formatMessage({ id: "store" })}
          </NavbarUserInformationDrawerButton>
          <NavbarUserInformationDrawerButton
            leftIcon={<Icon name="user" />}
            onClick={() => onRedirectToURLAndCloseModal(appRoutes.me.home)}
          >
            {translate.formatMessage({ id: "profile" })}
          </NavbarUserInformationDrawerButton>
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <Stack direction="column" spacing="1">
          <NavbarUserInformationDrawerButton
            leftIcon={<Icon name="logout" />}
            onClick={onLogout}
          >
            {translate.formatMessage({ id: "logout" })}
          </NavbarUserInformationDrawerButton>
        </Stack>
      </DrawerFooter>
    </Drawer>
  );
};
