import { Container, Hero } from "@stokei/ui";
import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";

interface HeroWithTitleProps extends HeroTitleContentProps {}

export const HeroWithTitle: FC<HeroWithTitleProps> = ({
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
      </Hero>
    </Container>
  );
};
