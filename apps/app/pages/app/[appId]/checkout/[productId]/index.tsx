import { CheckoutPage } from "@/views/checkout";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

interface Props {
  readonly productId: string;
}

const Page: NextPage<Props> = ({ productId }) => {
  return <CheckoutPage productId={productId} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const productId =
    context?.query?.productId?.toString() ||
    context?.params?.productId?.toString();
  if (!productId) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      productId,
    },
  };
};

export default Page;
