import { SimpleGrid } from "@stokei/ui";
import { AdminAppPageAppFragment } from "../../graphql/apps.query.graphql.generated";
import { AppItem } from "../app-item";

interface AppsListProps {
  readonly apps?: AdminAppPageAppFragment[];
}

export const AppsList = ({ apps }: AppsListProps) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {apps?.map((app) => <AppItem key={app?.id} app={app} />)}
    </SimpleGrid>
  );
};
