import { useComponentsTree } from "@/hooks";
import { GetVersionResponse } from "@/services/axios/models/version";
import { GlobalPageFragment } from "@/services/graphql/queries/get-page-by-id/page.query.graphql.generated";
import {
  BuilderComponent,
  ComponentBuilderType,
  TreeSortable,
} from "@stokei/builder";
import { Box, Container } from "@stokei/ui";
import { useRouter } from "next/router";
import { Navbar } from "./components/navbar";
import { UpdatePageTitleForm } from "./components/update-page-title-form";
import { PageLayout } from "./layout";

export interface SitePageProps {
  version: GetVersionResponse;
  page: GlobalPageFragment;
}

const SitePage = () => {
  const router = useRouter();
  const { componentsTree, onRemoveComponent } = useComponentsTree();

  return (
    <Container paddingY="5">
      <Box
        width="fit-content"
        minWidth="60"
        paddingY="2"
        paddingX="5"
        flexDirection="column"
        borderWidth="thin"
        borderBottom="none"
        roundedTop="md"
        background="background.50"
      >
        <UpdatePageTitleForm />
      </Box>
      <Box
        flexDirection="column"
        borderWidth="thin"
        rounded="md"
        roundedTopLeft="unset"
        background="background.50"
      >
        <Container paddingY="5">
          <TreeSortable items={componentsTree}>
            {componentsTree?.map((component) => (
              <BuilderComponent
                id={component?.id}
                key={component?.id}
                order={component?.order}
                type={component?.type}
                acceptTypes={component?.acceptTypes}
                builderType={ComponentBuilderType.BLOCK_EDITABLE}
                components={component?.components}
                data={component?.data}
                onRedirect={router.push}
                onRemove={onRemoveComponent}
              />
            ))}
          </TreeSortable>
        </Container>
      </Box>
    </Container>
  );
};

const SitePageWithLayout = (props: SitePageProps) => {
  return (
    <PageLayout {...props}>
      <Navbar />
      <SitePage />
    </PageLayout>
  );
};

export { SitePageWithLayout as SitePage };
