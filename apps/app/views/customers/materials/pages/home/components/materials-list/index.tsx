import { SimpleGrid } from "@stokei/ui";
import { MaterialItem } from "../material-item";
import { AppSubscriptionContractsByItemMaterialProductMaterialFragment } from "../../../../graphql/subscription-contracts.query.graphql.generated";

interface MaterialsListProps {
  readonly materials?: AppSubscriptionContractsByItemMaterialProductMaterialFragment[];
}

export const MaterialsList = ({ materials }: MaterialsListProps) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {materials?.map((material) => (
        <MaterialItem key={material?.id} material={material} />
      ))}
    </SimpleGrid>
  );
};
