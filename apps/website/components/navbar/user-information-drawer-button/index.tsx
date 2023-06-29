import { Button, ButtonProps } from "@stokei/ui";
import { FC } from "react";

export interface NavbarUserInformationDrawerButtonProps extends ButtonProps {}
export const NavbarUserInformationDrawerButton: FC<
  NavbarUserInformationDrawerButtonProps
> = ({ children, ...props }) => {
  return (
    <Button
      paddingX="3"
      paddingY="3"
      rounded="md"
      justifyContent="flex-start"
      alignItems="flex-start"
      variant="ghost"
      {...props}
    >
      {children}
    </Button>
  );
};
