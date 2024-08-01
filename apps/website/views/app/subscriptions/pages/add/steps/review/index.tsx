import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { MemberSelectItemContent } from "@/components/select-members/member-select-item-content";
import { ProductSelectItemContent } from "@/components/select-products/product-select-item-content";
import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import {
  IntervalType,
  ProductType,
  SubscriptionContractType,
  UsageType,
} from "@/services/graphql/stokei";
import { getI18nKeyFromRecurringInterval } from "@/utils";
import {
  Badge,
  Button,
  ButtonGroup,
  DatePickerGroup,
  Label,
  Stack,
  Text,
  useToast,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useCreateSubscriptionContractMutation } from "../../graphql/create-subscription-contract.mutation.graphql.generated";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

interface ReviewStepProps {
  subscriptionType: SubscriptionContractType;
  products?: GeneralProductFragment[];
  student?: AppAccountFragment;
  startAt?: Date;
  endAt?: Date;
  recurringInterval: IntervalType;
  recurringIntervalCount: string;
  onPreviousStep: () => void;
}

export const ReviewStep = ({
  subscriptionType,
  products,
  student,
  startAt,
  endAt,
  recurringInterval,
  recurringIntervalCount,
  onPreviousStep,
}: ReviewStepProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const [
    { fetching: isLoadingCreateSubscriptionContract },
    onExecuteCreateSubscriptionContract,
  ] = useCreateSubscriptionContractMutation();
  const isRecurring = subscriptionType === SubscriptionContractType.Recurring;

  const recurringIntervalTypeKey = useMemo(() => {
    if (!recurringInterval) {
      return undefined;
    }
    const key = getI18nKeyFromRecurringInterval(recurringInterval);
    if (parseInt(recurringIntervalCount) > 1) {
      return key.plural;
    }
    return key.singular;
  }, [recurringInterval, recurringIntervalCount]);

  const onCreateSubscriptionContract = async () => {
    try {
      const productsMapped = products?.map(product => {
        return product?.type === ProductType.Combo ? product?.combo : [product]
      })
        ?.flat()
        ?.filter(Boolean);
      if (!productsMapped?.length) {
        return
      }
      const response = await onExecuteCreateSubscriptionContract({
        input: {
          parent: student?.id || "",
          type: subscriptionType,
          startAt: startAt?.toISOString(),
          endAt: endAt?.toISOString(),
          items: productsMapped?.map(item => ({
            quantity: 1,
            product: item?.externalReferenceId || "",
            orderProduct: item?.id || "",
            ...(subscriptionType === SubscriptionContractType.Recurring && {
              recurring: {
                interval: recurringInterval,
                intervalCount: parseInt(recurringIntervalCount),
                usageType: UsageType.Licensed,
              },
            }),
          }))
        }
      });
      if (!!response?.data?.createSubscriptionContract) {
        onShowToast({
          title: translate.formatMessage({ id: "createdSuccessfully" }),
          status: "success",
        });
        router.push(
          websiteRoutes
            .app({ appId: currentApp?.id })
            .subscriptions.subscription({
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
    } catch (error) { }
  };

  return (
    <Stack direction="column" spacing="5">
      <Stack direction="column" spacing="2">
        <Label>
          {translate.formatMessage({
            id: "student",
          })}
        </Label>
        <MemberSelectItemContent member={student} />
      </Stack>

      <Stack direction="column" spacing="2">
        <Label>
          {translate.formatMessage({
            id: "products",
          })}
        </Label>
        {products?.map(product => (
          <ProductSelectItemContent product={product} />
        ))}
      </Stack>

      <Stack direction="column" spacing="2">
        <Label>
          {translate.formatMessage({
            id: "period",
          })}
        </Label>

        {isRecurring ? (
          <Stack direction="row" spacing="2">
            <Text>{recurringIntervalCount}</Text>
            <Text>
              {translate.formatMessage({
                id: recurringIntervalTypeKey as any,
              })}
            </Text>
          </Stack>
        ) : (
          <Text>
            {translate.formatMessage({
              id: "lifelong",
            })}
          </Text>
        )}
      </Stack>

      <Stack direction="column" spacing="2">
        <Label>
          {translate.formatMessage({
            id: "intervalCount",
          })}
        </Label>
        <DatePickerGroup>
          <Text>{translate.formatDate(startAt)}</Text>

          {isRecurring ? (
            <Text>{translate.formatDate(endAt)}</Text>
          ) : (
            <Badge colorScheme="green">
              {translate.formatMessage({
                id: "lifelong",
              })}
            </Badge>
          )}
        </DatePickerGroup>
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
