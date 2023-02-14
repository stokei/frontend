import { CheckoutPage } from "@/views/checkout";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

interface Props {
  readonly productId: string;
  readonly clientSecret: string;
}

const Page: NextPage<Props> = ({ productId, clientSecret }) => {
  return <CheckoutPage productId={productId} clientSecret={clientSecret} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const productId =
    context?.query?.productId?.toString() ||
    context?.params?.productId?.toString();
  const clientSecret = context?.query?.clientSecret?.toString();
  if (!productId || !clientSecret) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      clientSecret,
      productId,
    },
  };
};

export default Page;
