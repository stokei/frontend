import { useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Button,
  Container,
  Hero,
  HeroContent,
  HeroImage,
  HeroMedia,
  HeroSubtitle,
  HeroTitle,
  HeroVideoPlayer,
  Highlight,
  Stack,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { CatalogsList } from "./components/catalogs-list";
import { useCatalogsQuery } from "./graphql/catalogs.query.graphql.generated";
import { useCurrentAppQuery } from "./graphql/current-app.query.graphql.generated";
import { LandingPageLayout } from "./layout";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const [{ data: currentAppData, fetching: isLoadingCurrentApp }] =
    useCurrentAppQuery();

  const [{ fetching: isLoadingCatalogs, data: dataCatalogs }] =
    useCatalogsQuery({
      variables: {
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
          },
        },
        orderBy: {
          createdAt: OrderBy.Desc,
        },
      },
    });

  const app = useMemo(() => currentAppData?.currentApp, [currentAppData]);
  const heroHasJustMedia = useMemo(
    () => !(app?.hero?.title || app?.hero?.subtitle),
    [app]
  );

  return (
    <LandingPageLayout isLoading={isLoadingCurrentApp}>
      <Stack direction="column" spacing="10" paddingBottom="14">
        {app?.hero && (
          <Container paddingTop="10" paddingBottom="0">
            <Hero justify={heroHasJustMedia ? "center" : "flex-start"}>
              {(app?.hero?.title || app?.hero?.subtitle) && (
                <HeroContent>
                  {app?.hero?.title && (
                    <HeroTitle>
                      {app?.hero?.titleHighlight ? (
                        <Highlight query={app?.hero?.titleHighlight}>
                          {app?.hero?.title}
                        </Highlight>
                      ) : (
                        <>{app?.hero?.title}</>
                      )}
                    </HeroTitle>
                  )}
                  {app?.hero?.subtitle && (
                    <HeroSubtitle>{app?.hero?.subtitle}</HeroSubtitle>
                  )}
                  <Stack direction={["column", "column", "row", "row"]}>
                    <Button onClick={() => router.push(routes.signUp)}>
                      {translate.formatMessage({ id: "signUp" })}
                    </Button>
                  </Stack>
                </HeroContent>
              )}
              {(app?.hero?.image?.file || app?.hero?.video?.file) && (
                <HeroMedia
                  width={[
                    "full",
                    "full",
                    heroHasJustMedia ? "50%" : "40%",
                    heroHasJustMedia ? "50%" : "40%",
                  ]}
                >
                  {app?.hero?.image?.file && (
                    <HeroImage src={app?.hero?.image?.file?.url || ""} />
                  )}
                  {app?.hero?.video?.file && (
                    <HeroVideoPlayer
                      id="video-hero"
                      src={app?.hero?.video?.file?.url || ""}
                    />
                  )}
                </HeroMedia>
              )}
            </Hero>
          </Container>
        )}
        {!!dataCatalogs?.catalogs?.items?.length && (
          <CatalogsList catalogs={dataCatalogs?.catalogs} />
        )}
      </Stack>
    </LandingPageLayout>
  );
};
