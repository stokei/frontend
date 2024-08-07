import { createAxiosAPIClient } from "@/services/axios/client";
import { GetVersionResponse, Version } from "@/services/axios/models/version";
import { getSiteBySlug } from "@/services/graphql/queries/get-app-by-slug";
import { getSiteSlugFromContext } from "@/utils/get-site-slug-from-context";
import { CustomPage } from "@/views/custom-page";
import { appRoutes } from "@stokei/routes";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

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
  const slug = getSiteSlugFromContext(context);
  const site = await getSiteBySlug({
    slug,
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
  const client = createAxiosAPIClient({
    appId: site?.app?.id,
    cookies,
  });
  const versionModel = new Version(client?.apiClient);
  let version;
  try {
    version = await versionModel?.getVersion(site?.homePage?.version?.id);
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
