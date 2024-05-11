import startSellImage from "@/assets/start-sell.svg";
import { useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  Button,
  Hero,
  HeroContent,
  HeroImage,
  HeroMedia,
  HeroSubtitle,
  HeroTitle
} from "@stokei/ui";
import { useRouter } from "next/router";

export const EndHero = () => {
  const router = useRouter();
  const translate = useTranslations();
  return (
    <Hero>
      <HeroContent>
        <HeroTitle>
          {translate.formatMessage({ id: "startSell" })}
        </HeroTitle>
        <HeroSubtitle>
          {translate.formatMessage({
            id: "startYourSalesJourneyBySharingYourAppLinkRightNow",
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
          src={startSellImage?.src}
        />
      </HeroMedia>
    </Hero>
  );
};
