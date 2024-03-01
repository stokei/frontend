import { GetVersionResponse } from "@/services/axios/models/version";
import { BuilderComponent, ComponentBuilderType } from "@stokei/builder";
import { useRouter } from "next/router";

import { DynamicPageLayout } from "./layout";

interface DynamicPageProps {
  version: GetVersionResponse;
}

export const DynamicPage = ({ version }: DynamicPageProps) => {
  const router = useRouter();
  return (
    <DynamicPageLayout>
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
    </DynamicPageLayout>
  );
};
