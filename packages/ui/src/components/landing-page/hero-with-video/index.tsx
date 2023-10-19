import { FC } from "react";
import { HeroTitleContent, HeroTitleContentProps } from "../hero-title-content";
import { Container } from "../../container";
import { Hero } from "../../hero";
import { HeroMedia } from "../../hero-media";
import { HeroVideoPlayer } from "../../hero-video-player";

interface HeroWithVideoProps extends HeroTitleContentProps {
  readonly videoURL?: string;
  readonly videoFilename?: string;
}

export const HeroWithVideo: FC<HeroWithVideoProps> = ({
  videoURL,
  videoFilename,
  title,
  subtitle,
  titleHighlight,
  subtitleHighlight,
  ctaText,
  onCTA,
}) => {
  return (
    <Container>
      <Hero>
        <HeroTitleContent
          title={title}
          subtitle={subtitle}
          titleHighlight={titleHighlight}
          subtitleHighlight={subtitleHighlight}
          onCTA={onCTA}
          ctaText={ctaText}
        />
        {videoURL && (
          <HeroMedia width={["full", "full", "40%", "40%"]}>
            <HeroVideoPlayer
              id={"hero-video-player" + title}
              src={videoURL || ""}
              filename={videoFilename || ""}
            />
          </HeroMedia>
        )}
      </Hero>
    </Container>
  );
};
