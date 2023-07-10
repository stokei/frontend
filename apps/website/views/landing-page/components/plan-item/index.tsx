import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
  IconName,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC } from "react";
import { LandingPageProductPlanFeatureFragment } from "../../graphql/products.query.graphql.generated";

interface PlanItemProps {
  readonly icon: IconName;
  readonly title: string;
  readonly features: LandingPageProductPlanFeatureFragment[];
  readonly price?: PriceComponentFragment | null;
}

export const PlanItem: FC<PlanItemProps> = ({
  features,
  icon,
  title,
  price,
}) => {
  return (
    <Card background="background.50" justify="space-between">
      <CardHeader>
        <Stack spacing="2" justify="center" align="center">
          <Avatar
            background="primary.500"
            size="lg"
            icon={<Icon name={icon} fontSize="2xl" color="white.500" />}
          />
          <Title size={"md"}>{title}</Title>
        </Stack>
      </CardHeader>
      {features?.length ? (
        <CardBody paddingTop={0}>
          <List>
            {features?.map((feature) => (
              <ListItem key={feature.id}>
                <ListIcon name="check" color="green.500" />
                {feature.name}
              </ListItem>
            ))}
          </List>
        </CardBody>
      ) : undefined}
      <CardFooter background="background.200">
        <Box width="full" justify="center" align="center">
          <Price
            width="fit-content"
            price={price}
            justify="center"
            withUnitDescription
            withPriceAndUnitDirectionColumn
          />
        </Box>
      </CardFooter>
    </Card>
  );
};
