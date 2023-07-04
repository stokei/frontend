import { FC } from "react";
import { useTranslations } from "../../../hooks";
import { Box } from "../../box";
import { HeroContent } from "../../hero-content";
import { HeroSubtitle } from "../../hero-subtitle";
import { HeroTitle } from "../../hero-title";
import { Highlight } from "../../highlight";
import { Button } from "../../button";

export interface HeroTitleContentProps {
  readonly textTheme?: "light" | "dark";
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly titleHighlight?: string | null;
  readonly onSignUp: () => void;
}

export const HeroTitleContent: FC<HeroTitleContentProps> = ({
  textTheme = "light",
  title,
  titleHighlight,
  subtitle,
  onSignUp,
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
      <Box>
        <Button onClick={onSignUp}>
          {translate.formatMessage({ id: "signUp" })}
        </Button>
      </Box>
    </HeroContent>
  );
};
