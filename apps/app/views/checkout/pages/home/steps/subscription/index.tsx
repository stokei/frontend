import defaultNoImage from "@/assets/no-image.png";
import {
  Title,
  RadioCard,
  Stack,
  ButtonGroup,
  Button,
  RadioGroup,
  Image,
} from "@stokei/ui";
import { Price } from "@/components";
import { useTranslations } from "@/hooks";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { CheckoutProductFragment } from "@/views/checkout/graphql/product.query.graphql.generated";

export interface SubscriptionStepProps {
  product?: CheckoutProductFragment;
  prices?: PriceComponentFragment[];
  currentPrice?: PriceComponentFragment | null;
  onChoosePrice: (price: string) => void;
  onNextStep: () => void;
}

export const SubscriptionStep: React.FC<SubscriptionStepProps> = ({
  product,
  currentPrice,
  onNextStep,
  onChoosePrice,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="10">
      <Stack direction="row" spacing="5" align="center">
        <Image
          width="24"
          rounded="md"
          src={product?.avatar?.file?.url || ""}
          fallbackSrc={defaultNoImage.src}
          alt={translate.formatMessage({ id: "product" })}
        />

        <Title fontSize="lg">{product?.name}</Title>
      </Stack>

      <RadioGroup value={currentPrice?.id} onChange={onChoosePrice}>
        <Stack spacing="5" direction="column">
          {product?.prices?.items?.map((price) => (
            <RadioCard
              key={price?.id}
              id={price?.id}
              value={price?.id}
              isChecked={price?.id === currentPrice?.id}
            >
              <Stack direction="column" spacing="3">
                {price?.nickname && (
                  <Title fontSize="md">{price?.nickname}</Title>
                )}
                <Price price={price} />
              </Stack>
            </RadioCard>
          ))}
        </Stack>
      </RadioGroup>

      <ButtonGroup width="full" justifyContent="flex-end">
        <Button onClick={onNextStep} isDisabled={!currentPrice}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
