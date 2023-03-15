import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import {
  Avatar,
  Button,
  Icon,
  NavbarNavLink,
  Stack,
  StackProps,
  useDisclosure,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { NavbarUserInformationDrawer } from "../user-information-drawer";

export interface NavbarUserInformationProps extends StackProps {}
export const NavbarUserInformation: FC<NavbarUserInformationProps> = ({
  ...props
}) => {
  const { isOpen: isOpenDrawer, onToggle: onToggleDrawer } = useDisclosure();

  const router = useRouter();
  const { currentAccount, homePageURL } = useCurrentAccount();
  const translate = useTranslations();

  return (
    <Stack
      width="auto"
      flex="1"
      align="center"
      justify="flex-end"
      direction="row"
      {...props}
    >
      {!!currentAccount ? (
        <>
          <NavbarUserInformationDrawer
            isOpen={isOpenDrawer}
            onClose={onToggleDrawer}
          />
          <Stack spacing="4" direction="row" justify="flex-end" align="center">
            <NavbarNavLink href={homePageURL}>
              <Icon fontSize="lg" name="home" />
            </NavbarNavLink>
            <Avatar
              cursor="pointer"
              size="sm"
              name={currentAccount?.fullname}
              src={currentAccount?.avatar?.file?.url || ""}
              onClick={onToggleDrawer}
            />
          </Stack>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            onClick={() => router.push(routes.auth.login)}
          >
            {translate.formatMessage({ id: "login" })}
          </Button>
          <Button onClick={() => router.push(routes.auth.signUp)}>
            {translate.formatMessage({ id: "signUp" })}
          </Button>
        </>
      )}
    </Stack>
  );
};
