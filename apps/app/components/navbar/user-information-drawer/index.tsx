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
import { FC, useCallback } from "react";
import { NavbarUserInformationDrawerButton } from "../user-information-drawer-button";
import { routes } from "@/routes";

export interface NavbarUserInformationDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
}
export const NavbarUserInformationDrawer: FC<
  NavbarUserInformationDrawerProps
> = ({ isOpen, onClose }) => {
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
            onClick={() => onRedirectToURLAndCloseModal(homePageURL || "")}
          >
            {translate.formatMessage({ id: "home" })}
          </NavbarUserInformationDrawerButton>
          <NavbarUserInformationDrawerButton
            onClick={() => onRedirectToURLAndCloseModal(routes.me.home)}
          >
            {translate.formatMessage({ id: "profile" })}
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
