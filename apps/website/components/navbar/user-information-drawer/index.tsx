import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
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
import { FC, useCallback } from "react";
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
            onClick={() => onRedirectToURLAndCloseModal(routes.home)}
          >
            {translate.formatMessage({ id: "home" })}
          </NavbarUserInformationDrawerButton>
          <NavbarUserInformationDrawerButton
            leftIcon={<Icon name="user" />}
            onClick={() => onRedirectToURLAndCloseModal(routes.me.home)}
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
