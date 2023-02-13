import { Price } from "@/components";
import { useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { Box, Button, Card, CardBody, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { GetProductCourseQuery } from "../../graphql/course.query.graphql.generated";
import { Features } from "../features";

export interface CheckoutInfoProps {
  readonly product?: GetProductCourseQuery["product"] | null;
}

export const CheckoutInfo: FC<CheckoutInfoProps> = ({ product }) => {
  const router = useRouter();
  const translate = useTranslations();
  return (
    <Box
      minWidth={["full", "full", "350px", "350px"]}
      height="fit-content"
      flexDirection="column"
    >
      <Card
        background="background.50"
        flex="auto"
        marginTop={["0", "0", "-100px", "-100px"]}
      >
        <CardBody>
          <Stack direction="column" spacing="4">
            <Price size="lg" price={product?.defaultPrice} />
            <Button
              width="full"
              onClick={() =>
                router.push(
                  getRoutes().checkout.home({ product: product?.id || "" })
                )
              }
            >
              {translate.formatMessage({ id: "buyNow" })}
            </Button>
            {!!product?.features?.totalCount && (
              <Features features={product?.features} />
            )}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};
