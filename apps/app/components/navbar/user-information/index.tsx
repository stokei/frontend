import { useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { Button, Stack, StackProps } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";

export interface NavbarUserInformationProps extends StackProps {}
export const NavbarUserInformation: FC<NavbarUserInformationProps> = ({
  ...props
}) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
    <Stack align="center" justify="flex-end" direction="row" {...props}>
      <Button variant="ghost" onClick={() => router.push(getRoutes().login)}>
        {translate.formatMessage({ id: "login" })}
      </Button>
      <Button onClick={() => router.push(getRoutes().signUp)}>
        {translate.formatMessage({ id: "signUp" })}
      </Button>
    </Stack>
  );
};
