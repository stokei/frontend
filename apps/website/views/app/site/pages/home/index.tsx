import { useSite } from "@/hooks";
import { Container, Title } from "@stokei/ui";

import { SiteLayout } from "../../layout";
import { Navbar } from "./components/navbar";

const SitePage = () => {
  const { site } = useSite();
  return (
    <Container paddingY="5">
      <Title marginBottom="5" textAlign="center" lineHeight="shorter">
        {site?.name}
      </Title>
    </Container>
  );
};

const SitePageWithLayout: FC<SitePageProps> = () => {
  return (
    <SiteLayout>
      <Navbar />
      <SitePage />
    </SiteLayout>
  );
};

export { SitePageWithLayout as SitePage };
