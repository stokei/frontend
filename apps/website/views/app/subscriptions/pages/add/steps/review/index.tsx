import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { AppProductFragment } from "@/components/select-product/graphql/products.query.graphql.generated";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { routes } from "@/routes";
import {
  IntervalType,
  SubscriptionContractType,
  UsageType,
} from "@/services/graphql/stokei";
import { Button, ButtonGroup, Stack, Title, useToast } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC } from "react";
import { ProductSelectItemContent } from "@/components/select-product/product-select-item-content";
import { useCreateSubscriptionContractMutation } from "../../graphql/create-subscription-contract.mutation.graphql.generated";
import { MemberSelectItemContent } from "@/components/select-members/member-select-item-content";

interface ReviewStepProps {
  product?: AppProductFragment;
  student?: AppAccountFragment;
  startAt?: Date;
  endAt?: Date;
  recurringInterval: IntervalType;
  recurringIntervalCount: string;
  onPreviousStep: () => void;
}

export const ReviewStep: FC<ReviewStepProps> = ({
  product,
  student,
  startAt,
  endAt,
  recurringInterval,
  recurringIntervalCount,
  onPreviousStep,
}) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const [
    { fetching: isLoadingCreateSubscriptionContract },
    onExecuteCreateSubscriptionContract,
  ] = useCreateSubscriptionContractMutation();

  const onCreateSubscriptionContract = async () => {
    try {
      const response = await onExecuteCreateSubscriptionContract({
        input: {
          parent: student?.id || "",
          type: SubscriptionContractType.Recurring,
          startAt: startAt?.toISOString(),
          endAt: endAt?.toISOString(),
          items: [
            {
              quantity: 1,
              product: product?.id || "",
              recurring: {
                interval: recurringInterval,
                intervalCount: parseInt(recurringIntervalCount),
                usageType: UsageType.Licensed,
              },
            },
          ],
        },
      });
      if (!!response?.data?.createSubscriptionContract) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        router.push(
          routes.app({ appId: currentApp?.id }).subscriptions.subscription({
            subscription: response.data.createSubscriptionContract.id,
          })
        );
        return;
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {}
  };

  return (
    <Stack direction="column" spacing="5">
      <Stack direction="column" spacing="2">
        <Title fontSize="lg">
          {translate.formatMessage({
            id: "student",
          })}
        </Title>
        <MemberSelectItemContent member={student} />
      </Stack>

      <Stack direction="column" spacing="2">
        <Title fontSize="lg">
          {translate.formatMessage({
            id: "product",
          })}
        </Title>
        <ProductSelectItemContent product={product} />
      </Stack>

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button
          onClick={onCreateSubscriptionContract}
          isLoading={isLoadingCreateSubscriptionContract}
        >
          {translate.formatMessage({ id: "save" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
