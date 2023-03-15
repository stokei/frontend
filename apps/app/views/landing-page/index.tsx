import { SortedItemFactory } from "@/components";
import { useCurrentApp, useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { FC } from "react";
import { LandingPageLayout } from "./layout";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <LandingPageLayout>
      <SortedItemFactory />
    </LandingPageLayout>
  );
};
