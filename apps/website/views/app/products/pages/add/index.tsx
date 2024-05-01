import { AddProductStep } from "@/constants/add-product-steps";
import { ProductType } from "@/constants/product-type";
import { useTranslations } from "@/hooks";
import { useSelectCatalogs } from "@/hooks/use-select-catalogs";
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
import { useState } from "react";
import { ProductParent } from "./@types/product-parent";
import { ProductPayload } from "./@types/product-payload";
import { Navbar } from "./components/navbar";
import { CatalogsStep } from "./steps/catalogs-step";
import { ProductChooseTypeStep } from "./steps/product-choose-type-step";
import { ProductInformationStep } from "./steps/product-information-step";
import { ProductTypeStep } from "./steps/product-type-step";
import { SummaryStep } from "./steps/summary";

export const AddProductPage = () => {
  const [productType, setProductType] = useState<ProductType>(
    ProductType.COURSE
  );
  const { catalogs, onChooseCatalog, onRemoveCatalog } = useSelectCatalogs();
  const [productParent, setProductParent] = useState<ProductParent>();
  const [productPayload, setProductPayload] = useState<ProductPayload>();
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
                title={translate.formatMessage({ id: "informations" })}
                stepIndex={AddProductStep.PRODUCT_INFORMATION}
              />
              <StepItem
                isDisabled={!productPayload}
                title={translate.formatMessage({ id: "catalogs" })}
                stepIndex={AddProductStep.CATALOG}
              />
              <StepItem
                isDisabled={!productPayload}
                title={translate.formatMessage({ id: "summary" })}
                stepIndex={AddProductStep.SUMMARY}
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
                      onChangeProductPayload={setProductPayload}
                      onNextStep={() => setCurrentStep(AddProductStep.CATALOG)}
                      onPreviousStep={onPreviousProductInformation}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddProductStep.CATALOG}>
                    <CatalogsStep
                      catalogs={catalogs}
                      onChooseCatalog={onChooseCatalog}
                      onRemoveCatalog={onRemoveCatalog}
                      onNextStep={() => setCurrentStep(AddProductStep.SUMMARY)}
                      onPreviousStep={() =>
                        setCurrentStep(AddProductStep.PRODUCT_INFORMATION)
                      }
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddProductStep.SUMMARY}>
                    <SummaryStep
                      productParent={productParent}
                      productPayload={productPayload}
                      catalogs={catalogs}
                      onPreviousStep={() =>
                        setCurrentStep(AddProductStep.CATALOG)
                      }
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
