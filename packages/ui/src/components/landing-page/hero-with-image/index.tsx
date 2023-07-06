import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";
import { HeroMedia } from "../../hero-media";
import { HeroImage } from "../../hero-image";

interface HeroWithImageProps extends HeroTitleContentProps {
  readonly imageURL?: string;
}

export const HeroWithImage: FC<HeroWithImageProps> = ({
  imageURL,
  title,
  subtitle,
  titleHighlight,
  subtitleHighlight,
  onSignUp,
}) => {
  return (
    <Container>
      <Hero>
        <HeroTitleContent
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
          subtitleHighlight={subtitleHighlight}
          onSignUp={onSignUp}
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
