import { Button, ButtonProps } from "@stokei/ui";

export interface NavbarUserInformationDrawerButtonProps extends ButtonProps { }
export const NavbarUserInformationDrawerButton = ({
  children,
  ...props
}: NavbarUserInformationDrawerButtonProps) => {
  return (
    <Button
      width="full"
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
