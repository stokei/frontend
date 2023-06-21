import { getBaseURLOfTheServerSide } from "@/utils/get-base-url-of-the-server-side";
import { ProductPage } from "@/views/admins/product";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

interface Props {
  readonly baseURL: string;
}

const Page: NextPage<Props> = ({ baseURL }) => {
  return <ProductPage baseURL={baseURL} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const response = context?.res;
  return {
    props: {
      baseURL: getBaseURLOfTheServerSide(response),
    },
  };
};

export default Page;
