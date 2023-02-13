import { List, ListIcon, ListItem } from "@stokei/ui";
import { FC } from "react";
import { PlansProductFragment } from "../../graphql/product.fragment.graphql.generated";

export interface FeaturesProps {
  readonly features?: PlansProductFragment["features"] | null;
}

export const Features: FC<FeaturesProps> = ({ features }) => {
  return (
    <List>
      {features?.items?.map((feature) => (
        <ListItem key={feature.id}>
          <ListIcon
            key={feature.id}
            name="check"
            color="green.500"
            fontSize="lg"
          />
          {feature.name}
        </ListItem>
      ))}
    </List>
  );
};
