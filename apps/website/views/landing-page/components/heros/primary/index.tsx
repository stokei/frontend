import stokeiDashboardImage from "@/assets/stokei-dashboard.svg";
import { useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  Button,
  Hero,
  HeroContent,
  HeroImage,
  HeroMedia,
  HeroSubtitle,
  HeroTitle,
  Highlight
} from "@stokei/ui";
import { useRouter } from "next/router";

export const PrimaryHero = () => {
  const router = useRouter();
  const translate = useTranslations();
  return (
    <Hero>
      <HeroContent>
        <HeroTitle>
          <Highlight query={translate.formatMessage({ id: 'turnYourKnowledgeIntoAProductHighlight' })}>
            {translate.formatMessage({ id: "turnYourKnowledgeIntoAProduct" })}
          </Highlight>
        </HeroTitle>
        <HeroSubtitle>
          {translate.formatMessage({
            id: "thePlatformThatTransformsYourKnowledgeIntoOnlineCourses",
          })}
        </HeroSubtitle>
        <Button
          onClick={() => router.push(websiteRoutes.auth.signUp)}
        >
          {translate.formatMessage({
            id: "signUp",
          })}
        </Button>
      </HeroContent>
      <HeroMedia>
        <HeroImage
          src={stokeiDashboardImage?.src}
        />
      </HeroMedia>
    </Hero>
  );
};
