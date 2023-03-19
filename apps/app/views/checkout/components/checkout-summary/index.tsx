import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { Box, Button, Card, CardBody, Image, Stack, Title } from "@stokei/ui";
import { FC } from "react";

export interface CheckoutSummaryProps {
  readonly productId?: string;
  readonly productName?: string;
  readonly avatarURL?: string;
  readonly canBuy?: boolean;
  readonly price?: PriceComponentFragment | null;
}

export const CheckoutSummary: FC<CheckoutSummaryProps> = ({
  productName,
  canBuy,
  avatarURL,
  price,
}) => {
  const translate = useTranslations();

  const onBuy = async () => {};

  return (
    <Stack direction="column" spacing="4">
      <Stack direction="row" spacing="5" align="center">
        <Image
          width="24"
          height="fit-content"
          rounded="md"
          src={avatarURL || ""}
          fallbackSrc={defaultNoImage.src}
        />

        <Title fontSize="lg" marginBottom="5">
          {productName}
        </Title>
      </Stack>
      <Price size="lg" price={price} />
      <Button width="full" onClick={onBuy} isDisabled={!canBuy}>
        {translate.formatMessage({ id: "subscribe" })}
      </Button>
      <Button width="full" onClick={onBuy} isDisabled={!canBuy}>
        {translate.formatMessage({ id: "previous" })}
      </Button>
    </Stack>
  );
};
