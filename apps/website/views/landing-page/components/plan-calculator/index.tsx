import { StokeiApiIdPrefix } from "@/constants/stokei-api-id-prefix";
import { useCurrentApp, useTranslations } from "@/hooks";
import { PlanType } from "@/services/graphql/stokei";
import { CardFooter, Stack, Text } from "@stokei/ui";
import { useMemo, useState } from "react";
import { useGetLandingPageProductsQuery } from "../../graphql/products.query.graphql.generated";
import { PlanItem } from "../plan-item";
import { PlanItemFeature } from "../plan-item/plan-item-feature";
import { PlanItemFeatures } from "../plan-item/plan-item-features";
import { PlanItemHeader } from "../plan-item/plan-item-header";
import { PlanInput } from "./plan-input";

export const PlanCalculator = () => {
  const [videoMinutes, setVideoMinutes] = useState<number>();
  const [storageSize, setStorageSize] = useState<number>();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const [{ data: dataGetPlanProducts, fetching: isLoading }] = useGetLandingPageProductsQuery({
    pause: !currentApp?.id,
    variables: {
      where: {
        AND: {
          parent: {
            startsWith: StokeiApiIdPrefix.PLANS
          },
          app: {
            equals: currentApp?.id
          }
        }
      }
    }
  });

  const plans = useMemo(() => dataGetPlanProducts?.products?.items || [], [dataGetPlanProducts?.products?.items]);
  const storagePlan = useMemo(() => plans?.find(plan => plan.parent?.__typename === "Plan" && plan.parent.type === PlanType.Storage), [plans]);
  const videoPlan = useMemo(() => plans?.find(plan => plan.parent?.__typename === "Plan" && plan.parent.type === PlanType.Video), [plans]);

  const price = useMemo(() => {
    const getTotal = (quantity?: number, amount?: number) => !!amount && !!quantity ? amount * quantity : 0;
    const videoMinutesPrice = getTotal(videoMinutes, videoPlan?.defaultPrice?.amount || 0);
    const storageSizePrice = getTotal(storageSize, storagePlan?.defaultPrice?.amount || 0);
    return videoMinutesPrice + storageSizePrice;
  }, [storagePlan, storageSize, videoMinutes, videoPlan]);

  return (
    <PlanItem>
      <PlanItemHeader
        title={translate.formatMessage({ id: 'premium' })}
        subtitle={translate.formatMessage({ id: 'monthly' })}
        price={price}
      />
      <PlanItemFeatures>
        <PlanItemFeature
          name={translate.formatMessage({ id: 'allOfTheFreePlan' })}
        />
        <PlanItemFeature
          name={translate.formatMessage({ id: 'storageAndVideoSecure' })}
        />
      </PlanItemFeatures>
      <CardFooter>
        <Stack direction="column" spacing="5">
          <Text>{translate.formatMessage({ id: 'calculatePlanPrice' })}</Text>
          <PlanInput
            id="materials"
            value={storageSize}
            onChangeValue={setStorageSize}
            isLoading={isLoading}
            plan={storagePlan}
          />
          <PlanInput
            id="videos"
            value={videoMinutes}
            onChangeValue={setVideoMinutes}
            isLoading={isLoading}
            plan={videoPlan}
          />
        </Stack>
      </CardFooter>
    </PlanItem>
  );
};
