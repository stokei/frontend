import { AddProductStep } from "@/constants/add-product-steps";
import { ProductType } from "@/constants/product-type";
import { useTranslations } from "@/hooks";
import { useSelectCatalogs } from "@/hooks/use-select-catalogs";
import { useSelectProducts } from "@/hooks/use-select-products";
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
  useActiveSteps,
} from "@stokei/ui";
import { useState } from "react";
import { ProductExternalReference } from "./@types/product-external-reference";
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
  const [productExternalReference, setProductExternalReference] = useState<ProductExternalReference>();
  const [productPayload, setProductPayload] = useState<ProductPayload>();
  const [isEnabledProductStep, setIsEnabledProductStep] =
    useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<AddProductStep>(
    AddProductStep.PRODUCT_TYPE
  );
  const translate = useTranslations();
  const {
    activeSteps,
    onActivateStep,
    onDeactivateStep
  } = useActiveSteps<AddProductStep>({
    initialState: {
      [AddProductStep.PRODUCT_TYPE]: true,
      [AddProductStep.PRODUCT_CHOOSE_TYPE]: false,
      [AddProductStep.PRODUCT_INFORMATION]: false,
      [AddProductStep.CATALOG]: false,
      [AddProductStep.SUMMARY]: false,
    }
  });
  const {
    products: comboProducts,
    onChooseProduct: onChooseComboProduct
  } = useSelectProducts();
  const { catalogs, onChooseCatalog } = useSelectCatalogs();

  const onSuccessProductType = () => {
    if (productType !== ProductType.OTHER) {
      onActivateStep(AddProductStep.PRODUCT_CHOOSE_TYPE);
      setCurrentStep(AddProductStep.PRODUCT_CHOOSE_TYPE);
      return
    }
    onActivateStep(AddProductStep.PRODUCT_INFORMATION);
    setCurrentStep(AddProductStep.PRODUCT_INFORMATION);
  };
  const onSuccessChooseProductType = () => {
    setIsEnabledProductStep(true);
    setCurrentStep(AddProductStep.PRODUCT_INFORMATION);
    onActivateStep(AddProductStep.PRODUCT_INFORMATION);
  };
  const onPreviousProductInformation = () => {
    setIsEnabledProductStep(false);
    if (productType !== ProductType.OTHER) {
      onDeactivateStep(AddProductStep.PRODUCT_CHOOSE_TYPE);
      setCurrentStep(AddProductStep.PRODUCT_CHOOSE_TYPE);
      return
    }
    onDeactivateStep(AddProductStep.PRODUCT_INFORMATION);
    setCurrentStep(AddProductStep.PRODUCT_INFORMATION);
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
                isCompleted={activeSteps?.[AddProductStep.PRODUCT_TYPE]}
              />
              <StepItem
                isDisabled={productType === ProductType.OTHER}
                title={translate.formatMessage({ id: "chooseType" })}
                stepIndex={AddProductStep.PRODUCT_CHOOSE_TYPE}
                isCompleted={activeSteps?.[AddProductStep.PRODUCT_CHOOSE_TYPE]}
              />
              <StepItem
                isDisabled={!isEnabledProductStep}
                title={translate.formatMessage({ id: "informations" })}
                stepIndex={AddProductStep.PRODUCT_INFORMATION}
                isCompleted={activeSteps?.[AddProductStep.PRODUCT_INFORMATION]}
              />
              <StepItem
                isDisabled={!productPayload}
                title={translate.formatMessage({ id: "catalogs" })}
                stepIndex={AddProductStep.CATALOG}
                isCompleted={activeSteps?.[AddProductStep.CATALOG]}
              />
              <StepItem
                isDisabled={!productPayload}
                title={translate.formatMessage({ id: "summary" })}
                stepIndex={AddProductStep.SUMMARY}
                isCompleted={activeSteps?.[AddProductStep.SUMMARY]}
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
                      comboProducts={comboProducts}
                      productExternalReference={productExternalReference}
                      onChangeComboProduct={onChooseComboProduct}
                      productType={productType}
                      onChangeProductExternalReference={setProductExternalReference}
                      onNextStep={onSuccessChooseProductType}
                      onPreviousStep={() =>
                        setCurrentStep(AddProductStep.PRODUCT_TYPE)
                      }
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddProductStep.PRODUCT_INFORMATION}>
                    <ProductInformationStep
                      productExternalReference={productExternalReference}
                      onChangeProductPayload={setProductPayload}
                      onNextStep={() => setCurrentStep(AddProductStep.CATALOG)}
                      onPreviousStep={onPreviousProductInformation}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddProductStep.CATALOG}>
                    <CatalogsStep
                      catalogs={catalogs}
                      onChooseCatalog={onChooseCatalog}
                      onNextStep={() => setCurrentStep(AddProductStep.SUMMARY)}
                      onPreviousStep={() =>
                        setCurrentStep(AddProductStep.PRODUCT_INFORMATION)
                      }
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddProductStep.SUMMARY}>
                    <SummaryStep
                      productType={productType}
                      comboProducts={comboProducts}
                      productExternalReference={productExternalReference}
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
