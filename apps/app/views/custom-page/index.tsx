import { GetVersionResponse } from "@/services/axios/models/version";
import { BuilderComponent, ComponentBuilderType } from "@stokei/builder";
import { useRouter } from "next/router";

import { CustomPageLayout } from "./layout";
import { Container, NotFound, NotFoundIcon, NotFoundSubtitle } from "@stokei/ui";
import { useTranslations } from "@/hooks";

interface CustomPageProps {
  version: GetVersionResponse;
}

export const CustomPage = ({ version }: CustomPageProps) => {
  const router = useRouter();
  const translate = useTranslations();
  return (
    <CustomPageLayout>
      {version?.components?.length ? (
        <>
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
        </>
      ) : (
        <Container paddingY="5">
          <NotFound>
            <NotFoundIcon name="component" />
            <NotFoundSubtitle>
              {translate.formatMessage({ id: "componentsNotFound" })}
            </NotFoundSubtitle>
          </NotFound>
        </Container>
      )}
    </CustomPageLayout>
  );
};
