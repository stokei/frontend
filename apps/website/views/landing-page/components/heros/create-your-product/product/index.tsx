import productImage from "@/assets/product-example.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { IntervalType, PriceType } from "@/services/graphql/stokei";
import { Price } from "@stokei/builder";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Description,
  Image,
  Stack,
  Title
} from "@stokei/ui";

interface ProductProps {
  name: string;
  price: number;
}
export const Product = ({ name, price }: ProductProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Card background="background.50" overflow="hidden">
      <CardHeader position="relative" padding="0">
        <Image
          width="full"
          src={productImage.src}
          alt={translate.formatMessage({ id: "product" })}
        />
      </CardHeader>
      <CardBody>
        <Box width="full" flexDirection="column" height="full">
          <Title size="md" marginBottom="5">
            {name}
          </Title>
          <Box width="full" flexDirection="column" flex="1">
            <Stack spacing="3" flex="1">
              <Description>
                Jhon snow
              </Description>
              {currentApp?.currency && (
                <Price
                  price={{
                    id: '1',
                    isDefault: true,
                    parent: "",
                    amount: price,
                    type: PriceType.Recurring,
                    active: true,
                    currency: currentApp?.currency,
                    recurring: {
                      interval: IntervalType.Month,
                      intervalCount: 1,
                    }
                  }}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};
