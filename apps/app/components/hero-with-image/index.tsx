import { Container, Hero, HeroImage, HeroMedia } from "@stokei/ui";
import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";

interface HeroWithImageProps extends HeroTitleContentProps {
  readonly imageURL?: string;
}

export const HeroWithImage: FC<HeroWithImageProps> = ({
  imageURL,
  title,
  subtitle,
  titleHighlight,
}) => {
  return (
    <Container>
      <Hero>
        <HeroTitleContent
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
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
