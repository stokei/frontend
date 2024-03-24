import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";

interface HeroWithBackgroundImageProps extends HeroTitleContentProps {
  readonly imageURL: string;
}

export const HeroWithBackgroundImage = ({
  imageURL,
  title,
  subtitle,
  titleHighlight,
  subtitleHighlight,
  ctaText,
  onCTA,
}: HeroWithBackgroundImageProps) => {
  return (
    <Hero
      justify="center"
      backgroundImage={imageURL}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      <Container>
        <HeroTitleContent
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
          subtitleHighlight={subtitleHighlight}
          onCTA={onCTA}
          ctaText={ctaText}
        />
      </Container>
    </Hero>
  );
};
