import stokeiDashboardImage from "@/assets/stokei-dashboard.svg";
import createYourAppImage from "@/assets/create-your-app.png";
import createYourDomainImage from "@/assets/create-your-domain.png";
import createYourProductsImage from "@/assets/create-your-product.png";
import createYourPricesImage from "@/assets/create-your-prices.png";
import startSellImage from "@/assets/start-sell.svg";
import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { HeroWithImage } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { LandingPageLayout } from "./layout";
import { Plans } from "./components/plans";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { CommonQuestions } from "./components/common-questions";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const goToLogin = () => {
    return router.push(routes.auth.login);
  };
  const goToSignUp = () => {
    return router.push(routes.auth.signUp);
  };
  return (
    <LandingPageLayout>
      <HeroWithImage
        title={translate.formatMessage({ id: "turnYourKnowledgeIntoAProduct" })}
        titleHighlight={translate.formatMessage({
          id: "turnYourKnowledgeIntoAProductHighlight",
        })}
        subtitle={translate.formatMessage({
          id: "thePlatformThatTransformsYourKnowledgeIntoOnlineCourses",
        })}
        imageURL={stokeiDashboardImage?.src}
        onCTA={goToSignUp}
      />
      <HeroWithImage
        title={translate.formatMessage({ id: "createYourApp" })}
        subtitle={translate.formatMessage({
          id: "anApplicationIsYourControlCenterForManagingProducts",
        })}
        imageURL={createYourAppImage?.src}
      />
      {/* <HeroWithImage
        orientation="right"
        title={translate.formatMessage({ id: "haveMoreThanOneWebsite" })}
        titleHighlight={translate.formatMessage({
          id: "turnYourKnowledgeIntoAProductHighlight",
        })}
        subtitle={translate.formatMessage({
          id: "withStokeiYouCanTransformYourKnowledgeIntoOnlineCourses",
        })}
        imageURL={stokeiDashboardImage?.src}
      /> */}
      <HeroWithImage
        orientation="right"
        title={translate.formatMessage({ id: "chooseYourDomain" })}
        titleHighlight={translate.formatMessage({
          id: "turnYourKnowledgeIntoAProductHighlight",
        })}
        subtitle={translate.formatMessage({
          id: "customizeYourExperienceChooseFromStokeiSFreeDomainOrAddYourOwnCustomDomain",
        })}
        imageURL={createYourDomainImage?.src}
      />
      <HeroWithImage
        title={translate.formatMessage({ id: "createYourProducts" })}
        subtitle={translate.formatMessage({
          id: "startCreatingYourProductsWithHighQualityImagesAndChooseImpactfulNames",
        })}
        imageURL={createYourProductsImage?.src}
      />
      <HeroWithImage
        orientation="right"
        title={translate.formatMessage({ id: "createYourPrices" })}
        subtitle={translate.formatMessage({
          id: "setPricesThatMeetYourCustomersNeeds",
        })}
        imageURL={createYourPricesImage?.src}
      />
      <HeroWithImage
        title={translate.formatMessage({ id: "startSell" })}
        subtitle={translate.formatMessage({
          id: "startYourSalesJourneyBySharingYourAppLinkRightNow",
        })}
        imageURL={startSellImage?.src}
        onCTA={goToSignUp}
      />
      <Plans />
      <CommonQuestions />
      <Contact />
    </LandingPageLayout>
  );
};
