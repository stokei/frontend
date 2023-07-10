import stokeiDashboardImage from "@/assets/stokei-dashboard.svg";
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
          id: "withStokeiYouCanTransformYourKnowledgeIntoOnlineCoursesStartTeachingNow",
        })}
        imageURL={stokeiDashboardImage?.src}
        onSignUp={goToSignUp}
      />
      <Plans />
      <CommonQuestions />
      <Contact />
    </LandingPageLayout>
  );
};
