import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";

export const HeroWithTitle = ({
  title,
  subtitle,
  titleHighlight,
  subtitleHighlight,
  ctaText,
  onCTA,
}: HeroTitleContentProps) => {
  return (
    <Container>
      <Hero>
        <HeroTitleContent
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
          subtitleHighlight={subtitleHighlight}
          onCTA={onCTA}
          ctaText={ctaText}
        />
      </Hero>
    </Container>
  );
};
