import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";
import { HeroMedia } from "../../hero-media";
import { HeroImage } from "../../hero-image";

interface HeroWithImageProps extends HeroTitleContentProps {
  readonly imageURL?: string;
  readonly orientation?: "left" | "right";
}

export const HeroWithImage = ({
  imageURL,
  title,
  subtitle,
  titleHighlight,
  subtitleHighlight,
  ctaText,
  onCTA,
  orientation = "left",
}: HeroWithImageProps) => {
  return (
    <Container>
      <Hero
        direction={
          orientation === "left"
            ? ["column", "column", "row", "row"]
            : ["column", "column", "row-reverse", "row-reverse"]
        }
      >
        <HeroTitleContent
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
          subtitleHighlight={subtitleHighlight}
          onCTA={onCTA}
          ctaText={ctaText}
        />
        {imageURL && (
          <HeroMedia width={["full", "full", "40%", "40%"]}>
            <HeroImage src={imageURL || ""} />
          </HeroMedia>
        )}
      </Hero>
    </Container>
  );
};
