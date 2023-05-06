import { NotFoundPage } from "@/views/errors/pages";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = () => {
  return <NotFoundPage />;
};

export default Page;
