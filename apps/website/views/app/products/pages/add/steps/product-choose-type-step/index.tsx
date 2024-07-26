import { ProductType } from "@/constants/product-type";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack, Title } from "@stokei/ui";

import { ProductExternalReference } from "../../@types/product-external-reference";
import { SelectCurse } from "../../components/select-course";
import { SelectMaterial } from "../../components/select-material";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { SelectProducts } from "@/components/select-products";

interface ProductChooseTypeStepProps {
  productType: ProductType;
  comboProducts?: GeneralProductFragment[];
  productExternalReference?: ProductExternalReference;
  onChangeComboProduct: (comboProduct?: GeneralProductFragment) => void;
  onChangeProductExternalReference: (externalReference?: ProductExternalReference) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const ProductChooseTypeStep = ({
  productType,
  productExternalReference,
  comboProducts,
  onChangeComboProduct,
  onNextStep,
  onPreviousStep,
  onChangeProductExternalReference,
}: ProductChooseTypeStepProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Stack direction="column" spacing="5">
        <Title fontSize="lg">
          {translate.formatMessage({
            id: "chooseType",
          })}
        </Title>

        {productType === ProductType.COMBO && (
          <SelectProducts
            label={translate.formatMessage({
              id: "products",
            })}
            value={comboProducts}
            onChange={onChangeComboProduct}
          />
        )}
        {productType === ProductType.COURSE && (
          <SelectCurse
            productExternalReference={productExternalReference}
            onChangeProductExternalReference={onChangeProductExternalReference}
          />
        )}
        {productType === ProductType.MATERIAL && (
          <SelectMaterial
            productExternalReference={productExternalReference}
            onChangeProductExternalReference={onChangeProductExternalReference}
          />
        )}
        <ButtonGroup width="full" justifyContent="space-between">
          <Button variant="ghost" onClick={onPreviousStep}>
            {translate.formatMessage({ id: "previous" })}
          </Button>
          <Button onClick={onNextStep} isDisabled={productType === ProductType.COMBO ? !comboProducts?.length : !productExternalReference}>
            {translate.formatMessage({ id: "next" })}
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};
