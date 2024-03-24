import { Stack } from "@stokei/ui";

import { ProductPageFeatureFragment } from "../../graphql/features.query.graphql.generated";
import { FeatureItem } from "../feature-item";

interface FeaturesListProps {
  readonly features?: ProductPageFeatureFragment[];
  readonly onRemovedFeatures: () => void;
}

export const FeaturesList = ({
  features,
  onRemovedFeatures,
}: FeaturesListProps) => {
  return (
    <Stack direction="column" spacing="5">
      {features?.map((feature) => (
        <FeatureItem
          key={feature?.id}
          feature={feature}
          onRemovedFeatures={onRemovedFeatures}
        />
      ))}
    </Stack>
  );
};
