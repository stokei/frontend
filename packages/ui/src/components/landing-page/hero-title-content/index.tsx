import { useTranslations } from "../../../hooks";
import { Button } from "../../button";
import { ButtonGroup } from "../../button-group";
import { HeroContent } from "../../hero-content";
import { HeroSubtitle } from "../../hero-subtitle";
import { HeroTitle } from "../../hero-title";
import { Highlight } from "../../highlight";

export interface HeroTitleContentProps {
  readonly textTheme?: "light" | "dark";
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly ctaText?: string;
  readonly titleHighlight?: string | null;
  readonly subtitleHighlight?: string | null;
  readonly onCTA?: () => void;
}

export const HeroTitleContent = ({
  textTheme = "light",
  title,
  titleHighlight,
  subtitle,
  subtitleHighlight,
  ctaText,
  onCTA,
}: HeroTitleContentProps) => {
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
          {subtitleHighlight ? (
            <Highlight query={subtitleHighlight}>{subtitle}</Highlight>
          ) : (
            <>{subtitle}</>
          )}
        </HeroSubtitle>
      )}
      {onCTA && (
        <ButtonGroup>
          <Button onClick={onCTA}>
            {ctaText || translate.formatMessage({ id: "signUp" })}
          </Button>
        </ButtonGroup>
      )}
    </HeroContent>
  );
};
