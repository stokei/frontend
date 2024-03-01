import { createAxiosAPIClient } from "@/services/axios/client";
import { GetVersionResponse, Version } from "@/services/axios/models/version";
import { getSiteBySlug } from "@/services/graphql/queries/get-app-by-slug";
import { getPageBySlug } from "@/services/graphql/queries/get-page-by-slug";
import { getAppSlugFromContext } from "@/utils/get-app-slug-from-context";
import { getPageSlugFromContext } from "@/utils/get-page-slug-from-context";
import { DynamicPage } from "@/views/dynamic-page";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

interface Props {
  version: GetVersionResponse;
}

const Page: NextPage<Props> = ({ version }) => {
  return <DynamicPage version={version} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context?.req?.cookies;
  const siteSlug = getAppSlugFromContext(context);
  const site = await getSiteBySlug({
    slug: siteSlug,
    cookies,
  });
  if (!site?.homePage?.version?.id) {
    return {
      notFound: true,
    };
  }
  const pageSlug = getPageSlugFromContext(context);
  if (!pageSlug) {
    return {
      notFound: true,
    };
  }
  const page = await getPageBySlug({
    slug: pageSlug,
    site: site.id,
    cookies,
  });
  if (!page?.version?.id) {
    return {
      notFound: true,
    };
  }
  const client = createAxiosAPIClient({
    appId: site?.app?.id,
    cookies,
  });
  const versionModel = new Version(client?.apiClient);
  let version;
  try {
    version = await versionModel?.getVersion(page?.version?.id);
  } catch (error) {}
  if (!version) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      version,
    },
  };
};

export default Page;
