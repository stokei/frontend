import { GetVersionResponse } from "@/services/axios/models/version";
import { BuilderComponent, ComponentBuilderType } from "@stokei/builder";
import { useRouter } from "next/router";
import { FC } from "react";
import { LandingPageLayout } from "./layout";

interface LandingPageProps {
  version: GetVersionResponse;
}

export const LandingPage: FC<LandingPageProps> = ({ version }) => {
  const router = useRouter();
  return (
    <LandingPageLayout>
      {version?.components?.map((component) => (
        <BuilderComponent
          id={component?.id}
          key={component?.id}
          type={component?.type}
          builderType={ComponentBuilderType.BLOCK_READABLE}
          components={component?.components}
          data={component?.data}
          onRedirect={router.push}
        />
      ))}
    </LandingPageLayout>
  );
};
