import { ProductType } from "@/constants/product-type";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Form, Stack, Title } from "@stokei/ui";
import { FC } from "react";
import { ProductParent } from "../../@types/product-parent";
import { SelectCurse } from "../select-course";
import { SelectMaterial } from "../select-material";

interface ProductChooseTypeStepProps {
  productType: ProductType;
  productParent?: ProductParent;
  onChangeProductParent: (parent?: ProductParent) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const ProductChooseTypeStep: FC<ProductChooseTypeStepProps> = ({
  productType,
  productParent,
  onNextStep,
  onPreviousStep,
  onChangeProductParent,
}) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Form onSubmit={onNextStep}>
        <Stack direction="column" spacing="5">
          <Title fontSize="lg">
            {translate.formatMessage({
              id: "chooseType",
            })}
          </Title>

          {productType === ProductType.COURSE && (
            <SelectCurse
              productParent={productParent}
              onChangeProductParent={onChangeProductParent}
            />
          )}
          {productType === ProductType.MATERIAL && (
            <SelectMaterial
              productParent={productParent}
              onChangeProductParent={onChangeProductParent}
            />
          )}
          <ButtonGroup width="full" justifyContent="space-between">
            <Button variant="ghost" onClick={onPreviousStep}>
              {translate.formatMessage({ id: "previous" })}
            </Button>
            <Button type="submit" isDisabled={!productParent}>
              {translate.formatMessage({ id: "next" })}
            </Button>
          </ButtonGroup>
        </Stack>
      </Form>
    </Stack>
  );
};
