import { useTranslations } from "@/hooks";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { List, ListIcon, ListItem, Stack, Text } from "@stokei/ui";

export interface FeaturesProps {
  readonly features?: GeneralProductFragment["features"];
}

export const Features = ({ features }: FeaturesProps) => {
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
