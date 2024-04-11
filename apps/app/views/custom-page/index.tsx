import { GetVersionResponse } from "@/services/axios/models/version";
import { BuilderComponent, ComponentBuilderType } from "@stokei/builder";
import { useRouter } from "next/router";

import { CustomPageLayout } from "./layout";

interface CustomPageProps {
  version: GetVersionResponse;
}

export const CustomPage = ({ version }: CustomPageProps) => {
  const router = useRouter();
  return (
    <CustomPageLayout>
      {version?.components?.map((component) => (
        <BuilderComponent
          id={component?.id}
          key={component?.id}
          order={component?.order}
          type={component?.type}
          builderType={ComponentBuilderType.BLOCK_READABLE}
          components={component?.components}
          data={component?.data}
          onRedirect={router.push}
        />
      ))}
    </CustomPageLayout>
  );
};
