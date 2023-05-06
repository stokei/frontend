import { useCurrentApp } from "@/hooks";
import { FC, useMemo } from "react";
import { LandingPageLayout } from "./layout";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  const { currentApp } = useCurrentApp();
  return <LandingPageLayout></LandingPageLayout>;
};
