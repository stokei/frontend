import { Container } from "@stokei/ui";

import { CommonQuestions } from "./components/common-questions";
import { Contact } from "./components/contact";
import { CreateYourAppHero } from "./components/heros/create-your-app";
import { CreateYourDomainHero } from "./components/heros/create-your-domain";
import { CreateYourPricesHero } from "./components/heros/create-your-prices";
import { CreateYourProductHero } from "./components/heros/create-your-product";
import { EndHero } from "./components/heros/end";
import { PrimaryHero } from "./components/heros/primary";
import { Plans } from "./components/plans";
import { LandingPageLayout } from "./layout";
import { Functionalities } from "./components/functionalities";

export const LandingPage = () => {
  return (
    <LandingPageLayout>
      <Container>
        <PrimaryHero />
        <CreateYourAppHero />
        <CreateYourDomainHero />
        <CreateYourProductHero />
        <CreateYourPricesHero />
        <EndHero />
        <Functionalities />
      </Container>
      <Plans />
      <CommonQuestions />
      <Contact />
    </LandingPageLayout>
  );
};
