import { useTranslations } from "@/hooks";
import { List, ListIcon, ListItem, Stack, Text } from "@stokei/ui";
import { FC } from "react";
import { ProductPageProductFragment } from "../../../graphql/product.query.graphql.generated";

export interface FeaturesProps {
  readonly features?: ProductPageProductFragment["features"];
}

export const Features: FC<FeaturesProps> = ({ features }) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="2">
      <Text fontWeight="bold">
        {translate.formatMessage({ id: "thisCourseIncludes" })}:
      </Text>
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
    </Stack>
  );
};
