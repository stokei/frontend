import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { AddSubscriptionContractStep } from "@/constants/add-subscription-contract-steps";
import { useTranslations } from "@/hooks";
import {
  IntervalType,
  SubscriptionContractType,
} from "@/services/graphql/stokei";
import { getEndDate } from "@/utils/get-end-date";
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
import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { PeriodStep } from "./steps/period";
import { ProductStep } from "./steps/product";
import { ReviewStep } from "./steps/review";
import { StudentStep } from "./steps/student";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";
import { addOrRemoveItemFromArray } from "@stokei/utils";

export const AddSubscriptionContractPage = () => {
  const {
    activeSteps,
    onActivateStep
  } = useActiveSteps<AddSubscriptionContractStep>({
    initialState: {
      [AddSubscriptionContractStep.STUDENT]: true,
      [AddSubscriptionContractStep.PRODUCT]: false,
      [AddSubscriptionContractStep.PERIOD]: false,
      [AddSubscriptionContractStep.REVIEW]: false,
    }
  });
  const [currentStep, setCurrentStep] = useState<AddSubscriptionContractStep>(
    AddSubscriptionContractStep.STUDENT
  );
  const [student, setStudent] = useState<AppAccountFragment>();
  const [products, setProducts] = useState<GeneralProductFragment[]>();
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>();
  const [recurringInterval, setRecurringInterval] = useState<IntervalType>(
    IntervalType.Month
  );
  const [recurringIntervalCount, setRecurringIntervalCount] =
    useState<string>("1");
  const [subscriptionType, setSubscriptionType] =
    useState<SubscriptionContractType>(SubscriptionContractType.OneTime);
  const translate = useTranslations();

  useEffect(() => {
    if (startAt) {
      setEndAt(
        getEndDate({
          startAt,
          interval: recurringInterval,
          intervalCount: parseInt(recurringIntervalCount),
        })
      );
    }
  }, [recurringInterval, recurringIntervalCount, startAt]);

  const onGoToStudent = () => {
    setCurrentStep(AddSubscriptionContractStep.STUDENT);
    onActivateStep(AddSubscriptionContractStep.STUDENT);
  };
  const onGoToProduct = () => {
    if (student) {
      setCurrentStep(AddSubscriptionContractStep.PRODUCT);
      onActivateStep(AddSubscriptionContractStep.PRODUCT);
    }
  };
  const onGoToPeriod = () => {
    if (products?.length) {
      setCurrentStep(AddSubscriptionContractStep.PERIOD);
      onActivateStep(AddSubscriptionContractStep.PERIOD);
    }
  };
  const onGoToReview = () => {
    if (products?.length && student) {
      setCurrentStep(AddSubscriptionContractStep.REVIEW);
      onActivateStep(AddSubscriptionContractStep.REVIEW);
    }
  };
  const onChooseProduct = (product?: GeneralProductFragment) => {
    if (product) {
      setProducts(currentProducts => addOrRemoveItemFromArray(currentProducts || [], product, 'id'));
    }
  }

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
                title={translate.formatMessage({ id: "student" })}
                stepIndex={AddSubscriptionContractStep.STUDENT}
                isCompleted={activeSteps?.[AddSubscriptionContractStep.STUDENT]}
              />
              <StepItem
                isDisabled={!student}
                title={translate.formatMessage({ id: "product" })}
                stepIndex={AddSubscriptionContractStep.PRODUCT}
                isCompleted={activeSteps?.[AddSubscriptionContractStep.PRODUCT]}
              />
              <StepItem
                isDisabled={!student || !products?.length}
                title={translate.formatMessage({ id: "period" })}
                stepIndex={AddSubscriptionContractStep.PERIOD}
                isCompleted={activeSteps?.[AddSubscriptionContractStep.PERIOD]}
              />
              <StepItem
                isDisabled={!student || !products?.length}
                title={translate.formatMessage({ id: "review" })}
                stepIndex={AddSubscriptionContractStep.REVIEW}
                isCompleted={activeSteps?.[AddSubscriptionContractStep.REVIEW]}
              />
            </StepList>
            <StepPanels>
              <Card background="background.50">
                <CardBody>
                  <StepPanel stepIndex={AddSubscriptionContractStep.STUDENT}>
                    <StudentStep
                      student={student}
                      onNextStep={onGoToProduct}
                      onChooseStudent={setStudent}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddSubscriptionContractStep.PRODUCT}>
                    <ProductStep
                      products={products}
                      onPreviousStep={onGoToStudent}
                      onNextStep={onGoToPeriod}
                      onChooseProduct={onChooseProduct}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddSubscriptionContractStep.PERIOD}>
                    <PeriodStep
                      startAt={startAt}
                      endAt={endAt}
                      subscriptionType={subscriptionType}
                      onChangeSubscriptionType={setSubscriptionType}
                      onChangeStartAt={setStartAt}
                      onChangeEndAt={setEndAt}
                      interval={recurringInterval}
                      intervalCount={recurringIntervalCount}
                      onChangeInterval={setRecurringInterval}
                      onChangeIntervalCount={setRecurringIntervalCount}
                      onPreviousStep={onGoToProduct}
                      onNextStep={onGoToReview}
                    />
                  </StepPanel>
                  <StepPanel stepIndex={AddSubscriptionContractStep.REVIEW}>
                    <ReviewStep
                      products={products}
                      student={student}
                      startAt={startAt}
                      endAt={endAt}
                      subscriptionType={subscriptionType}
                      recurringInterval={recurringInterval}
                      recurringIntervalCount={recurringIntervalCount}
                      onPreviousStep={onGoToPeriod}
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
