import { SelectProducts } from "@/components/select-product";
import { AppProductFragment } from "@/components/select-product/graphql/products.query.graphql.generated";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack, Title } from "@stokei/ui";

interface ProductStepProps {
  product?: AppProductFragment;
  onChooseProduct: (product?: AppProductFragment) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const ProductStep = ({
  product,
  onPreviousStep,
  onNextStep,
  onChooseProduct,
}: ProductStepProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="lg">
        {translate.formatMessage({
          id: "chooseProduct",
        })}
      </Title>

      <SelectProducts
        value={product ? [product] : []}
        onChange={onChooseProduct}
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
