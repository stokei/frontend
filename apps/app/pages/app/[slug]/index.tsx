import { createAxiosAPIClient } from "@/services/axios/client";
import { GetVersionResponse, Version } from "@/services/axios/models/version";
import { getSiteBySlug } from "@/services/graphql/queries/get-app-by-slug";
import { getAppSlugFromContext } from "@/utils/get-app-slug-from-context";
import { LandingPage } from "@/views/landing-page";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

interface Props {
  version: GetVersionResponse;
}

const Page: NextPage<Props> = ({ version }) => {
  return <LandingPage version={version} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context?.req?.cookies;
  const slug = getAppSlugFromContext(context);
  const site = await getSiteBySlug({
    slug,
    cookies,
  });
  if (!site?.homePage?.version?.id) {
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
    version = await versionModel?.getVersion(site?.homePage?.version?.id);
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
