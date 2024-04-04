import { useComponentsTree } from "@/hooks";
import { GetVersionResponse } from "@/services/axios/models/version";
import { GlobalPageFragment } from "@/services/graphql/queries/get-page-by-id/page.query.graphql.generated";
import {
  BuilderComponent,
  ComponentBuilderType,
  DropComponentHere,
  TreeSortable,
} from "@stokei/builder";
import { Box, Container, SortableItem, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { UpdatePageTitleForm } from "./components/update-page-title-form";
import { PageLayout } from "./layout";
import { ComponentType } from "@/services/graphql/stokei";

export interface SitePageProps {
  version: GetVersionResponse;
  page: GlobalPageFragment;
}

const SitePage = () => {
  const router = useRouter();
  const { components, onRemoveComponent, onUpdateComponent } =
    useComponentsTree();

  return (
    <Container paddingY="5">
      <Stack direction="column" spacing="5">
        <Header />
        <Box width="full" flexDirection="column">
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
              <TreeSortable items={components || []}>
                {components?.length ? (
                  <>
                    {components?.map((component) => (
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
                        onRemove={() =>
                          onRemoveComponent({ componentId: component?.id })
                        }
                        onUpdate={(data: any) =>
                          onUpdateComponent({
                            componentId: component?.id,
                            updateCallback: (currentComponentToUpdate) => ({
                              ...currentComponentToUpdate,
                              data,
                            }),
                          })
                        }
                      />
                    ))}
                  </>
                ) : (
                  <SortableItem
                    id="empty-item"
                    type={ComponentType.Block}
                    data={{
                      isEmpty: true,
                    }}
                  >
                    <DropComponentHere />
                  </SortableItem>
                )}
              </TreeSortable>
            </Container>
          </Box>
        </Box>
      </Stack>
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
