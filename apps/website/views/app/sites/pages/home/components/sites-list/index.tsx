import { Stack } from "@stokei/ui";
import { SitesHomePageSiteFragment } from "../../graphql/sites.query.graphql.generated";
import { SiteItem } from "../site-item";

interface SitesListProps {
  readonly sites?: SitesHomePageSiteFragment[];
}

export const SitesList = ({ sites }: SitesListProps) => {
  return (
    <Stack direction="column" spacing="5">
      {sites?.map((site) => <SiteItem key={site?.id} site={site} />)}
    </Stack>
  );
};
