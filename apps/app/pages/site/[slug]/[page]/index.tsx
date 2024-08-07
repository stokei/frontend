import { createAxiosAPIClient } from "@/services/axios/client";
import { GetVersionResponse, Version } from "@/services/axios/models/version";
import { getSiteBySlug } from "@/services/graphql/queries/get-app-by-slug";
import { getPageBySlug } from "@/services/graphql/queries/get-page-by-slug";
import { getSiteSlugFromContext } from "@/utils/get-site-slug-from-context";
import { getPageSlugFromContext } from "@/utils/get-page-slug-from-context";
import { CustomPage } from "@/views/custom-page";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { appRoutes } from "@stokei/routes";

interface Props {
  version: GetVersionResponse;
}

const Page: NextPage<Props> = ({ version }) => {
  return <CustomPage version={version} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context?.req?.cookies;
  const siteSlug = getSiteSlugFromContext(context);
  const site = await getSiteBySlug({
    slug: siteSlug,
    cookies,
  });
  if (!site?.homePage?.version?.id) {
    return {
      redirect: {
        destination: appRoutes.auth.login,
        permanent: false,
      },
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
  } catch (error) { }
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
