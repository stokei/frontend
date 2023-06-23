import { Container, Hero, HeroImage, HeroMedia } from "@stokei/ui";
import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";

interface HeroWithBackgroundImageProps extends HeroTitleContentProps {
  readonly imageURL?: string;
}

export const HeroWithBackgroundImage: FC<HeroWithBackgroundImageProps> = ({
  imageURL,
  title,
  subtitle,
  titleHighlight,
}) => {
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
          textTheme="dark"
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
        />
      </Container>
    </Hero>
  );
};
