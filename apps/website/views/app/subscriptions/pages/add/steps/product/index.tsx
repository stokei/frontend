import { SelectProducts } from "@/components/select-products";
import { useTranslations } from "@/hooks";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { Button, ButtonGroup, Stack, Title } from "@stokei/ui";

interface ProductStepProps {
  products?: GeneralProductFragment[];
  onChooseProduct: (product?: GeneralProductFragment) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const ProductStep = ({
  products,
  onPreviousStep,
  onNextStep,
  onChooseProduct,
}: ProductStepProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="lg">
        {translate.formatMessage({
          id: "chooseProducts",
        })}
      </Title>

      <SelectProducts
        label={translate.formatMessage({
          id: "products",
        })}
        value={products?.length ? products : []}
        onChange={onChooseProduct}
      />

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={!products?.length}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
