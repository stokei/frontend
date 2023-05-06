import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { Button, Stack, StackProps } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";

export interface NavbarAuthMenuProps extends StackProps {}
export const NavbarAuthMenu: FC<NavbarAuthMenuProps> = ({ ...props }) => {
  const router = useRouter();
  const translate = useTranslations();
  const redirectTo = useMemo(
    () => router.query?.redirectTo?.toString() || "",
    [router]
  );

  return (
    <Stack
      width="auto"
      flex="1"
      align="center"
      justify="flex-end"
      direction="row"
      {...props}
    >
      <Button
        variant="ghost"
        onClick={() =>
          router.push({
            pathname: routes.auth.login,
            query: {
              redirectTo,
            },
          })
        }
      >
        {translate.formatMessage({ id: "login" })}
      </Button>
      <Button
        onClick={() =>
          router.push({
            pathname: routes.auth.signUp,
            query: {
              redirectTo,
            },
          })
        }
      >
        {translate.formatMessage({ id: "signUp" })}
      </Button>
    </Stack>
  );
};
