import { usePage, useTranslations } from "@/hooks";
import { Button, ButtonProps, Icon, Menu, MenuButton, MenuList } from "@stokei/ui";

import { RemovePageButton } from "./remove-page-button";
import { RemoveVersionButton } from "./remove-version-button";
import { VisitPageButton } from "./visit-page-button";
import { PublishVersionButton } from "./publish-version-button";
import { CreateVersionButton } from "./create-version-button";
import { MakeLoginPageButton } from "./make-login-page-button";
import { MakeHomePageButton } from "./make-home-page-button";
import { MakeSignUpPageButton } from "./make-signup-page-button";

const buttonProps: ButtonProps = {
  size: "sm",
  rightIcon: <Icon name="caretDown" />,
};

interface ActionsMenuProps { }

export const ActionsMenu = ({ }: ActionsMenuProps) => {
  const translate = useTranslations();
  const { isProductionVersion, isHomePage, isLoginPage, isSignUpPage, page } = usePage();
  const canRemovePage = !isHomePage && !isSignUpPage && !isLoginPage && !!page?.canRemove;

  return (
    <Menu>
      <MenuButton as={Button} {...buttonProps}>
        {translate.formatMessage({ id: "actions" })}
      </MenuButton>
      <MenuList>
        {isProductionVersion ? (
          <>
            <VisitPageButton />
            <CreateVersionButton />
          </>
        ) : (
          <>
            <PublishVersionButton />
          </>
        )}
        {!isHomePage && (
          <MakeHomePageButton />
        )}
        {!isSignUpPage && (
          <MakeSignUpPageButton />
        )}
        {!isLoginPage && (
          <MakeLoginPageButton />
        )}
        {!isProductionVersion && (
          <RemoveVersionButton />
        )}
        {canRemovePage && (
          <RemovePageButton />
        )}
      </MenuList>
    </Menu>
  );
};
