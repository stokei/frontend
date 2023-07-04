import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";

interface HeroWithTitleProps extends HeroTitleContentProps {}

export const HeroWithTitle: FC<HeroWithTitleProps> = ({
  title,
  subtitle,
  titleHighlight,
  onSignUp,
}) => {
  return (
    <Container>
      <Hero>
        <HeroTitleContent
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
          onSignUp={onSignUp}
        />
      </Hero>
    </Container>
  );
};
