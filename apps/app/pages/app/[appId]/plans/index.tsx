import { PlansPage } from "@/views/plans";
import { NextPage } from "next";

interface Props {
  readonly productId: string;
}

const Page: NextPage<Props> = () => {
  return <PlansPage />;
};

export default Page;
