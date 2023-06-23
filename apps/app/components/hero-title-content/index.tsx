import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  Button,
  HeroContent,
  HeroSubtitle,
  HeroTitle,
  Highlight,
  Stack,
} from "@stokei/ui";
import router from "next/router";
import { FC } from "react";

export interface HeroTitleContentProps {
  readonly textTheme?: "light" | "dark";
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly titleHighlight?: string | null;
}

export const HeroTitleContent: FC<HeroTitleContentProps> = ({
  textTheme = "light",
  title,
  titleHighlight,
  subtitle,
}) => {
  const translate = useTranslations();

  return (
    <HeroContent>
      {title && (
        <HeroTitle color={textTheme === "dark" ? "white.500" : undefined}>
          {titleHighlight ? (
            <Highlight query={titleHighlight}>{title}</Highlight>
          ) : (
            <>{title}</>
          )}
        </HeroTitle>
      )}
      {subtitle && (
        <HeroSubtitle color={textTheme === "dark" ? "white.500" : undefined}>
          {subtitle}
        </HeroSubtitle>
      )}
      <Stack direction={["column", "column", "row", "row"]}>
        <Button onClick={() => router.push(routes.auth.signUp)}>
          {translate.formatMessage({ id: "signUp" })}
        </Button>
      </Stack>
    </HeroContent>
  );
};
