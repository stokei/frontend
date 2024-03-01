import { useTranslations } from "@/hooks";
import { GetVersionResponse } from "@/services/axios/models/version";
import { GlobalPageFragment } from "@/services/graphql/queries/get-page-by-id/page.query.graphql.generated";
import { BuilderComponent, ComponentBuilderType } from "@stokei/builder";
import { Container, Text } from "@stokei/ui";
import { useRouter } from "next/router";
import { SiteLayout } from "../../layout";
import { Navbar } from "./components/navbar";

export interface SitePageProps {
  version: GetVersionResponse;
  page: GlobalPageFragment;
}

const SitePage = ({ version, page }: SitePageProps) => {
  const router = useRouter();
  const translate = useTranslations();

  return (
    <Container paddingY="5">
      <Text>{page?.title}</Text>
      {version?.components?.map((component) => (
        <BuilderComponent
          id={component?.id}
          key={component?.id}
          type={component?.type}
          builderType={ComponentBuilderType.BLOCK_EDITABLE}
          components={component?.components}
          data={component?.data}
          onRedirect={router.push}
        />
      ))}
    </Container>
  );
};

const SitePageWithLayout = (props: SitePageProps) => {
  return (
    <SiteLayout>
      <Navbar />
      <SitePage {...props} />
    </SiteLayout>
  );
};

export { SitePageWithLayout as SitePage };
