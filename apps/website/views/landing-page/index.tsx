import createYourAppImage from "@/assets/create-your-app.png";
import createYourDomainImage from "@/assets/create-your-domain.png";
import createYourPricesImage from "@/assets/create-your-prices.png";
import createYourProductsImage from "@/assets/create-your-product.png";
import startSellImage from "@/assets/start-sell.svg";
import stokeiDashboardImage from "@/assets/stokei-dashboard.svg";
import { useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { HeroWithImage } from "@stokei/ui";
import { useRouter } from "next/router";

import { CommonQuestions } from "./components/common-questions";
import { Contact } from "./components/contact";
import { Plans } from "./components/plans";
import { LandingPageLayout } from "./layout";
import { PaymentMethods } from "./components/payment-methods";

export const LandingPage = () => {
  const router = useRouter();
  const translate = useTranslations();

  const goToSignUp = () => {
    return router.push(websiteRoutes.auth.signUp);
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
      <PaymentMethods />
      <CommonQuestions />
      <Contact />
    </LandingPageLayout>
  );
};
