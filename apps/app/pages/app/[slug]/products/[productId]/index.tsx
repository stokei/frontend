import { createAPIClient } from "@/services/graphql/client";
import { CoursePage } from "@/views/product/pages/course";
import { GenericProductPage } from "@/views/product/pages/generic";
import {
  GetProductPageProductDocument,
  GetProductPageProductQuery,
  ProductPageProductFragment,
} from "@/views/product/graphql/product.query.graphql.generated";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getAppSlugFromContext } from "@/utils/get-app-slug-from-context";
import { getAppBySlug } from "@/services/graphql/queries/get-app-by-slug";

interface Props {
  readonly product: ProductPageProductFragment;
  readonly productId: string;
}

const Page: NextPage<Props> = ({ product }) => {
  if (product?.parent?.__typename === "Course") {
    return <CoursePage product={product} />;
  }
  return <GenericProductPage product={product} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context?.req?.cookies;
  const slug = getAppSlugFromContext(context);
  const app = await getAppBySlug({
    slug,
    cookies,
  });
  if (!app) {
    return {
      notFound: true,
    };
  }
  const stokeiGraphQLClient = createAPIClient({
    appId: app?.id,
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
