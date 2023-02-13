import { ChangePasswordPage } from "@/views/auth";
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";

interface Props {
  readonly code: string;
}

const Page: NextPage<Props> = ({ code }) => {
  return <ChangePasswordPage code={code} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const code =
    context?.query?.code?.toString() || context?.params?.code?.toString();
  if (!code) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      code,
    },
  };
};

export default Page;
