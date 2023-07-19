import { SelectProducts } from "@/components/select-product";
import { AppProductFragment } from "@/components/select-product/graphql/products.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack, Title } from "@stokei/ui";
import { FC } from "react";

interface ProductStepProps {
  product?: AppProductFragment;
  onChooseProduct: (product?: AppProductFragment) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const ProductStep: FC<ProductStepProps> = ({
  product,
  onPreviousStep,
  onNextStep,
  onChooseProduct,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="lg">
        {translate.formatMessage({
          id: "chooseType",
        })}
      </Title>

      <SelectProducts
        currentProducts={product ? [product] : []}
        onChooseCurrentProduct={onChooseProduct}
        onRemoveChooseCurrentProduct={() => onChooseProduct(undefined)}
      />

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={!product}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
