import defaultNoImage from "@/assets/no-image.png";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  FormControl,
  Image,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC } from "react";

interface SubscriptionFormProps {
  readonly productName?: string;
  readonly avatarURL?: string;
  readonly currentPrice?: PriceComponentFragment | null;
  readonly prices?: PriceComponentFragment[];
  readonly onChoosePrice: (price?: PriceComponentFragment | null) => void;
  readonly onNextStep: () => void;
}

export const SubscriptionForm: FC<SubscriptionFormProps> = ({
  productName,
  avatarURL,
  currentPrice,
  prices,
  onChoosePrice,
  onNextStep,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Stack direction="row" spacing="5" align="center" marginBottom="5">
        <Image
          width="24"
          height="fit-content"
          rounded="md"
          src={avatarURL || ""}
          fallbackSrc={defaultNoImage.src}
          alt={translate.formatMessage({ id: "product" })}
        />

        <Title fontSize="lg">{productName}</Title>
      </Stack>

      <FormControl>
        <Label>{translate.formatMessage({ id: "chooseYourPlan" })}</Label>
        <Select
          value={currentPrice}
          onChooseItem={onChoosePrice}
          onRemoveChooseItem={onChoosePrice}
        >
          <SelectInput
            id="select-current-price"
            item={(valueCurrentPrice) => (
              <Stack direction="row" spacing="3">
                {valueCurrentPrice?.nickname && (
                  <>
                    <Text>{valueCurrentPrice?.nickname}</Text>
                    <Text>--</Text>
                  </>
                )}
                <Text>
                  {valueCurrentPrice?.currency?.symbol}
                  {translate.formatMoney({
                    amount: valueCurrentPrice?.amount || 0,
                    currency: valueCurrentPrice?.currency?.id || "",
                    minorUnit: valueCurrentPrice?.currency?.minorUnit,
                  })}
                </Text>
              </Stack>
            )}
          />
          <SelectList>
            {prices?.map((price) => (
              <SelectItem key={price?.id} value={price}>
                <Stack direction="row" spacing="3">
                  <Text>{price?.nickname}</Text>
                  <Text>--</Text>
                  <Text>
                    {price?.currency?.symbol}
                    {translate.formatMoney({
                      amount: price?.amount || 0,
                      currency: price?.currency?.id,
                      minorUnit: price?.currency?.minorUnit,
                    })}
                  </Text>
                </Stack>
              </SelectItem>
            ))}
          </SelectList>
        </Select>
      </FormControl>

      <ButtonGroup width="full" justifyContent="flex-end">
        <Button onClick={onNextStep} isDisabled={!currentPrice}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
