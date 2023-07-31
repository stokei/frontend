import { createAPIClient } from "@/services/graphql/client";
import { CoursePage } from "@/views/product/pages/course";
import { GenericProductPage } from "@/views/product/pages/generic";
import {
  GetProductPageProductDocument,
  GetProductPageProductQuery,
  ProductPageProductFragment,
} from "@/views/product/graphql/product.query.graphql.generated";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

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
  const appId =
    context?.query?.appId?.toString() || context?.params?.appId?.toString();
  if (!appId) {
    return {
      notFound: true,
    };
  }
  const cookies = context?.req?.cookies;
  const stokeiGraphQLClient = createAPIClient({
    appId,
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
