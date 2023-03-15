import { Container, Hero, HeroMedia, HeroVideoPlayer } from "@stokei/ui";
import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";

interface HeroWithVideoProps extends HeroTitleContentProps {
  readonly videoURL?: string;
}

export const HeroWithVideo: FC<HeroWithVideoProps> = ({
  videoURL,
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
        {videoURL && (
          <HeroMedia width={["full", "full", "40%", "40%"]}>
            <HeroVideoPlayer
              id={"hero-video-player" + title}
              src={videoURL || ""}
            />
          </HeroMedia>
        )}
      </Hero>
    </Container>
  );
};
