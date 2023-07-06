import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";

interface HeroWithBackgroundImageProps extends HeroTitleContentProps {
  readonly imageURL: string;
}

export const HeroWithBackgroundImage: FC<HeroWithBackgroundImageProps> = ({
  imageURL,
  title,
  subtitle,
  titleHighlight,
  subtitleHighlight,
  onSignUp,
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
          subtitleHighlight={subtitleHighlight}
          onSignUp={onSignUp}
        />
      </Container>
    </Hero>
  );
};
