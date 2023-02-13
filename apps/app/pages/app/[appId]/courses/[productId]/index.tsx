import { CoursePage } from "@/views/course";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

interface Props {
  readonly productId: string;
}

const Page: NextPage<Props> = ({ productId }) => {
  return <CoursePage productId={productId} />;
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
