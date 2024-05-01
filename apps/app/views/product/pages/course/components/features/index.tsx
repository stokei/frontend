import { useTranslations } from "@/hooks";
import { Description, Stack, Title } from "@stokei/ui";

import { ProductPageProductFragment } from "../../../../graphql/product.query.graphql.generated";

export interface FeaturesProps {
  readonly features?: ProductPageProductFragment["features"];
}

export const Features = ({ features }: FeaturesProps) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="2">
      <Title size="md" color="primary.500">
        {translate.formatMessage({ id: "features" })}
      </Title>
      <Stack direction="column" spacing="3">
        {features?.items?.map((feature) => (
          <Stack
            key={feature.id}
            width="fit-content"
            direction="column"
            spacing="1"
          >
            <Title fontSize="md">{feature?.name}</Title>
            <Description>{feature?.description}</Description>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
