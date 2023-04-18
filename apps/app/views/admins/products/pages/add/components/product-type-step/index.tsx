import { ProductType } from "@/constants/product-type";
import { useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  RadioCard,
  RadioGroup,
  Stack,
  Title,
} from "@stokei/ui";
import { FC, useMemo } from "react";

interface ProductTypeStepProps {
  productType: ProductType;
  onChangeProductType: (type: ProductType) => void;
  onNextStep: () => void;
}

export const ProductTypeStep: FC<ProductTypeStepProps> = ({
  productType,
  onNextStep,
  onChangeProductType,
}) => {
  const translate = useTranslations();
  const isFormDisabled = useMemo(() => !productType, [productType]);

  return (
    <Form onSubmit={onNextStep}>
      <Stack direction="column" spacing="5">
        <Title fontSize="lg">
          {translate.formatMessage({
            id: "whatTypeOfProductWouldYouLikeToCreate",
          })}
        </Title>
        <FormControl>
          <RadioGroup onChange={onChangeProductType} value={productType}>
            <Stack direction="column" spacing="4">
              <RadioCard
                id={"product-type-" + productType}
                value={ProductType.COURSE}
                isChecked={productType === ProductType.COURSE}
              >
                <Title fontSize="md">
                  {translate.formatMessage({ id: "course" })}
                </Title>
              </RadioCard>
              <RadioCard
                id={"product-type-" + productType}
                value={ProductType.OTHER}
                isChecked={productType === ProductType.OTHER}
              >
                <Title fontSize="md">
                  {translate.formatMessage({ id: "other" })}
                </Title>
              </RadioCard>
            </Stack>
          </RadioGroup>
        </FormControl>
        <ButtonGroup width="full" justifyContent="flex-end">
          <Button type="submit" isDisabled={isFormDisabled}>
            {translate.formatMessage({ id: "next" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Form>
  );
};
