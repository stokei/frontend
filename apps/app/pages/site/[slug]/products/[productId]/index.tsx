import { createAPIClient } from "@/services/graphql/client";
import { CoursePage } from "@/views/product/pages/course";
import { GenericProductPage } from "@/views/product/pages/generic";
import {
  GetProductPageProductDocument,
  GetProductPageProductQuery,
} from "@/views/product/graphql/product.query.graphql.generated";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSiteSlugFromContext } from "@/utils/get-site-slug-from-context";
import { getSiteBySlug } from "@/services/graphql/queries/get-app-by-slug";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

interface Props {
  readonly product: GeneralProductFragment;
  readonly productId: string;
}

const Page: NextPage<Props> = ({ product }) => {
  if (product?.externalReference?.__typename === "Course") {
    return <CoursePage product={product} />;
  }
  return <GenericProductPage product={product} />;
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
  if (!site) {
    return {
      notFound: true,
    };
  }
  const stokeiGraphQLClient = createAPIClient({
    appId: site?.app?.id,
    cookies,
  });
  const productId =
    context?.query?.productId?.toString() ||
    context?.params?.productId?.toString();
  if (!productId) {
    return {
      notFound: true,
    };
  }
  const productResponse = await stokeiGraphQLClient.api
    .query<GetProductPageProductQuery>(
      GetProductPageProductDocument,
      {
        product: productId,
      },
      { requestPolicy: "network-only" }
    )
    .toPromise();
  const product = productResponse?.data?.product;
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default Page;
