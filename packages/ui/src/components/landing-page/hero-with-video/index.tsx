import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";
import { HeroMedia } from "../../hero-media";
import { HeroVideoPlayer } from "../../hero-video-player";

interface HeroWithVideoProps extends HeroTitleContentProps {
  readonly videoURL?: string;
}

export const HeroWithVideo: FC<HeroWithVideoProps> = ({
  videoURL,
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
