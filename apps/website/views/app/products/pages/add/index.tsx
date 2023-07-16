import { AddProductStep } from "@/constants/add-product-steps";
import { ProductType } from "@/constants/product-type";
import { useTranslations } from "@/hooks";
import { AppLayout } from "@/views/app/layout";
import {
  Card,
  CardBody,
  Container,
  Stack,
  StepItem,
  StepList,
  StepPanel,
  StepPanels,
  Steps,
} from "@stokei/ui";
import { FC, useState } from "react";
import { ProductParent } from "./@types/product-parent";
import { Navbar } from "./components/navbar";
import { ProductChooseTypeStep } from "./components/product-choose-type-step";
import { ProductInformationStep } from "./components/product-information-step";
import { ProductTypeStep } from "./components/product-type-step";

interface AddProductPageProps {}

export const AddProductPage: FC<AddProductPageProps> = () => {
  const [productType, setProductType] = useState<ProductType>(
    ProductType.COURSE
  );
  const [productParent, setProductParent] = useState<ProductParent>();
  const [isEnabledProductStep, setIsEnabledProductStep] =
    useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<AddProductStep>(
    AddProductStep.PRODUCT_TYPE
  );
  const translate = useTranslations();

  const onSuccessProductType = () => {
    setCurrentStep(
      productType !== ProductType.OTHER
        ? AddProductStep.PRODUCT_CHOOSE_TYPE
        : AddProductStep.PRODUCT_INFORMATION
    );
  };
  const onSuccessChooseProductType = () => {
    setIsEnabledProductStep(true);
    setCurrentStep(AddProductStep.PRODUCT_INFORMATION);
  };
  const onPreviousProductInformation = () => {
    setIsEnabledProductStep(false);
    setCurrentStep(
      productType !== ProductType.OTHER
        ? AddProductStep.PRODUCT_CHOOSE_TYPE
        : AddProductStep.PRODUCT_TYPE
    );
  };

  return (
    <AppLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <Steps
            currentStep={currentStep}
            onChangeStep={(step) => setCurrentStep(step)}
          >
            <StepList justify="center" align="center">
              <StepItem
                title={translate.formatMessage({ id: "productType" })}
                stepIndex={AddProductStep.PRODUCT_TYPE}
              />
              <StepItem
                isDisabled={productType === ProductType.OTHER}
                title={translate.formatMessage({ id: "chooseType" })}
                stepIndex={AddProductStep.PRODUCT_CHOOSE_TYPE}
              />
              <StepItem
                isDisabled={!isEnabledProductStep}
                title={translate.formatMessage({ id: "product" })}
                stepIndex={AddProductStep.PRODUCT_INFORMATION}
              />
            </StepList>
            <StepPanels>
              <Card background="background.50">
                <CardBody>
                  <StepPanel stepIndex={AddProductStep.PRODUCT_TYPE}>
                    <ProductTypeStep
                      productType={productType}
                      onChangeProductType={setProductType}
                      onNextStep={onSuccessProductType}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddProductStep.PRODUCT_CHOOSE_TYPE}>
                    <ProductChooseTypeStep
                      productParent={productParent}
                      productType={productType}
                      onChangeProductParent={setProductParent}
                      onNextStep={onSuccessChooseProductType}
                      onPreviousStep={() =>
                        setCurrentStep(AddProductStep.PRODUCT_TYPE)
                      }
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddProductStep.PRODUCT_INFORMATION}>
                    <ProductInformationStep
                      productParent={productParent}
                      onPreviousStep={onPreviousProductInformation}
                    />
                  </StepPanel>
                </CardBody>
              </Card>
            </StepPanels>
          </Steps>
        </Stack>
      </Container>
    </AppLayout>
  );
};
