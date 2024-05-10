import { useCurrentApp, useTranslations } from "@/hooks";
import { PlanItem } from "../../plan-item";
import { PlanItemFeature } from "../../plan-item-feature";
import { PlanItemFeatures } from "../../plan-item-features";
import { PlanItemHeader } from "../../plan-item-header";
import { useMemo, useState } from "react";
import { CardFooter, FormControl, Input, InputGroup, InputLeftAddon, Label, Loading, Stack } from "@stokei/ui";
import { getOnlyNumbers } from "@stokei/utils";
import { useGetLandingPageProductsQuery } from "../../../graphql/products.query.graphql.generated";
import { StokeiApiIdPrefix } from "@/constants/stokei-api-id-prefix";
import { PlanType } from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";

export const PlanCalculator = () => {
  const [videoMinutes, setVideoMinutes] = useState(0);
  const [storageSize, setStorageSize] = useState(0);
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
    const getTotal = (quantity: number, amount?: number) => !!amount ? amount * quantity : 0;
    const videoMinutesPrice = getTotal(videoMinutes, videoPlan?.defaultPrice?.amount || 0);
    const storageSizePrice = getTotal(storageSize, storagePlan?.defaultPrice?.amount || 0);
    return videoMinutesPrice + storageSizePrice;
  }, [storagePlan, storageSize, videoMinutes, videoPlan]);

  return (
    <PlanItem>
      <PlanItemHeader
        title={translate.formatMessage({ id: 'premium' })}
        price={price}
      />
      <PlanItemFeatures>
        <PlanItemFeature
          name={translate.formatMessage({ id: 'allOfTheFreePlan' })}
        />
      </PlanItemFeatures>
      <CardFooter>
        <Stack direction="column" spacing="2">
          <FormControl>
            <Label htmlFor="materials-input">
              {translate.formatMessage({ id: 'materials' })}
            </Label>
            <InputGroup>
              <InputLeftAddon textTransform="capitalize">
                {storagePlan?.defaultPrice?.unit ?
                  translate.formatMessage({ id: convertEnumValueToCamelCase(storagePlan?.defaultPrice?.unit) }) :
                  <Loading />}
              </InputLeftAddon>
              <Input
                id="materials-input"
                value={storageSize + ''}
                isLoading={isLoading}
                onChange={e => {
                  const convertedValue = getOnlyNumbers(e.target.value)
                  e.target.value = convertedValue;
                  setStorageSize(convertedValue ? parseInt(convertedValue) : 0)
                }}
                roundedLeft={0}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <Label htmlFor="videos-input">
              {translate.formatMessage({ id: 'videos' })}
            </Label>
            <InputGroup>
              <InputLeftAddon textTransform="capitalize">
                {videoPlan?.defaultPrice?.unit ?
                  translate.formatMessage({ id: convertEnumValueToCamelCase(videoPlan?.defaultPrice?.unit) }) :
                  <Loading />}
              </InputLeftAddon>
              <Input
                id="videos-input"
                value={videoMinutes + ''}
                isLoading={isLoading}
                onChange={e => {
                  const convertedValue = getOnlyNumbers(e.target.value)
                  e.target.value = convertedValue;
                  setVideoMinutes(convertedValue ? parseInt(convertedValue) : 0)
                }}
                roundedLeft={0}
              />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardFooter>
    </PlanItem>
  );
};
