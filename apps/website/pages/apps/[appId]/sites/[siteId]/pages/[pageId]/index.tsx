import { Version } from "@/services/axios/models/version";
import { createAxiosAPIClient } from "@/services/clients/axios";
import { getPageById } from "@/services/graphql/queries/get-page-by-id";
import { getParamFromContext } from "@/utils/get-param-from-context";
import { SitePage, SitePageProps } from "@/views/app/site/pages/page";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<SitePageProps> = (props) => {
  return <SitePage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context?.req?.cookies;
  const pageId = getParamFromContext("pageId", context);
  let versionId = getParamFromContext("versionId", context);
  const appId = getParamFromContext("appId", context);
  if (!pageId) {
    return {
      notFound: true,
    };
  }
  const page = await getPageById({
    pageId,
    cookies,
  });
  if (!page) {
    return {
      notFound: true,
    };
  }
  const client = createAxiosAPIClient({
    appId,
    cookies,
  });
  const versionModel = new Version(client?.apiClient);
  let version;
  try {
    if (!versionId) {
      versionId = page?.version?.id || "";
    }
    if (!versionId) {
      return {
        notFound: true,
      };
    }
    version = await versionModel?.getVersion(versionId);
  } catch (error) {}
  if (!version) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      version,
      page,
    },
  };
};

export default Page;
