import { SimpleGrid } from "@stokei/ui";
import { SitesHomePageSiteFragment } from "../../graphql/sites.query.graphql.generated";
import { SiteItem } from "../site-item";

interface SitesListProps {
  readonly sites?: SitesHomePageSiteFragment[];
}

export const SitesList = ({ sites }: SitesListProps) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {sites?.map((site) => <SiteItem key={site?.id} site={site} />)}
    </SimpleGrid>
  );
};
